"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, FC } from "react";
import { join } from "@/utils/join";

export const NavLink: FC<ComponentProps<typeof Link>> = ({
  href,
  children,
  onClick,
  ...props
}) => {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={join(
        "text-gray-600 hover:text-accent transition-colors duration-normal ease-default",
        isActive ? "text-accent underline underline-offset-4 decoration-2" : "",
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
