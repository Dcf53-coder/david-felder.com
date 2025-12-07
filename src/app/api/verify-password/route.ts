import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Create a server-side Sanity client with the token
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// Cookie name for authenticated session
const AUTH_COOKIE_NAME = "df_download_auth";
// Cookie expiration: 24 hours
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24;

interface VerifyPasswordRequest {
  password: string;
  workId?: string;
}

export async function POST(request: Request) {
  try {
    const body: VerifyPasswordRequest = await request.json();
    const { password, workId } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 },
      );
    }

    // Fetch the password to compare against
    let correctPassword: string | null = null;

    // If workId is provided, check for a password override on the work
    if (workId) {
      const work = await client.fetch<{ passwordOverride: string | null }>(
        `*[_type == "work" && _id == $workId][0]{ passwordOverride }`,
        { workId },
      );

      if (work?.passwordOverride) {
        correctPassword = work.passwordOverride;
      }
    }

    // If no override, use the default password from site settings
    if (!correctPassword) {
      const settings = await client.fetch<{
        defaultAssetPassword: string | null;
      }>(
        `*[_type == "siteSettings" && _id == "siteSettings"][0]{ defaultAssetPassword }`,
      );

      correctPassword = settings?.defaultAssetPassword ?? null;
    }

    // If no password is configured at all, deny access
    if (!correctPassword) {
      return NextResponse.json(
        { success: false, error: "Password protection is not configured" },
        { status: 500 },
      );
    }

    // Case-insensitive comparison (matching the old Craft CMS behavior)
    const isValid = password.toLowerCase() === correctPassword.toLowerCase();

    if (isValid) {
      // Set an authentication cookie
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: AUTH_COOKIE_MAX_AGE,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Incorrect password" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Password verification error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred during verification" },
      { status: 500 },
    );
  }
}

// GET endpoint to check if user is already authenticated
export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

    return NextResponse.json({
      authenticated: authCookie?.value === "authenticated",
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
