'use client'

import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "./NavLink";

export const MobileNav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuContent = (
    <>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-fast ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu drawer */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-background shadow-xl z-50 transform transition-transform duration-fast ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-5">
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-accent transition-colors duration-normal ease-default"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col px-6 gap-2">
            <li>
              <MobileNavLink href="/works" onClick={() => setIsOpen(false)}>
                Works
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/programming" onClick={() => setIsOpen(false)}>
                Programming
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/recordings" onClick={() => setIsOpen(false)}>
                Recordings
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/reviews" onClick={() => setIsOpen(false)}>
                Reviews
              </MobileNavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className="block w-6 h-0.5 bg-foreground" />
        <span className="block w-6 h-0.5 bg-foreground" />
        <span className="block w-6 h-0.5 bg-foreground" />
      </button>

      {/* Portal the menu to document body */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
};

const MobileNavLink: FC<{ href: string; onClick: () => void; children: React.ReactNode }> = ({
  href,
  onClick,
  children
}) => {
  return (
    <div onClick={onClick}>
      <NavLink href={href}>
        <span className="block py-3 text-lg font-mono uppercase tracking-wider">
          {children}
        </span>
      </NavLink>
    </div>
  );
};
