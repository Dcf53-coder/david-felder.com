'use client'

import { join } from "@/utils/join";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC } from "react";

export const NavLink: FC<ComponentProps<typeof Link>> = ({ href, children }) => {
  const isActive = usePathname() == href;

  return (
    <Link href={href} className={join('text-gray-700 hover:text-gray-900', isActive ? 'underline' : '')}>
      {children}
    </Link>
  );
};
