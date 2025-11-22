'use client'

import { join } from "@/utils/join";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC } from "react";

export const NavLink: FC<ComponentProps<typeof Link>> = ({ href, children }) => {
  const isActive = usePathname() == href;

  return (
    <Link
      href={href}
      className={join(
        'text-gray-600 hover:text-accent transition-colors duration-normal ease-default',
        isActive ? 'text-accent underline underline-offset-4 decoration-2' : ''
      )}
    >
      {children}
    </Link>
  );
};
