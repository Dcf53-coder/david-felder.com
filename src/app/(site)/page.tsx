import { defineQuery } from "next-sanity";
import { RichText } from "@/components/RichText";
import Img from "@/components/ui/Img";
import { sanityFetch } from "@/sanity/lib/live";

const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  title,
  body,
  vitalInfo,
  otherLinks,
  images[]{
    asset -> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip
      }
    },
    caption,
    alt,
    credits
  },
  streamEmbed
}`);

export default async function Home() {
  const { data: aboutPage } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
  });

  if (!aboutPage) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <p className="text-gray-600">About page not found</p>
        </div>
      </div>
    );
  }

  const portraitImage = aboutPage.images?.[0];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-6xl">
        <header className="mb-20 flex flex-col items-center md:items-start">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            {aboutPage.title}
          </h1>
          <div className="mt-4 h-2 w-32 bg-gray-900" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {portraitImage?.asset && (
              <div className="w-full max-w-sm mx-auto lg:mx-0">
                <Img
                  image={portraitImage}
                  imageOptions={{ width: 400, height: 400 }}
                  alt={portraitImage.alt || "David Felder portrait"}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}

            {aboutPage.vitalInfo && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <RichText
                  value={aboutPage.vitalInfo}
                  className="prose prose-sm max-w-none [&_p]:text-sm [&_p]:leading-relaxed [&_a]:text-gray-900 [&_a]:underline"
                />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {aboutPage.body && (
              <div>
                <RichText
                  value={aboutPage.body}
                  className="prose prose-lg max-w-none [&_p]:text-gray-700 [&_p]:leading-relaxed [&_a]:text-gray-900 [&_a]:underline [&_strong]:text-gray-900 [&_em]:text-gray-700"
                />
              </div>
            )}

            {aboutPage.otherLinks && (
              <div className="border-t border-gray-200 pt-12">
                <RichText
                  value={aboutPage.otherLinks}
                  className="prose prose-lg max-w-none [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mb-8 [&_a]:text-gray-900 [&_a]:underline [&_ul]:space-y-3 [&_li]:text-gray-700"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
