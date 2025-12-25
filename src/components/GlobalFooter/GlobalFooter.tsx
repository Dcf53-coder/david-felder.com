import Link from "next/link";

export const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="group inline-block">
              <span className="text-4xl font-black tracking-tighter group-hover:text-accent transition-colors duration-500">
                David Feldersss
              </span>
            </Link>
            <p className="text-background/60 max-w-sm text-sm leading-relaxed">
              American composer and teacher. Exploring the intersection of
              acoustic instrumentation and digital technology.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li>
                <Link
                  href="/works"
                  className="hover:text-accent transition-colors"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href="/programming"
                  className="hover:text-accent transition-colors"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/recordings"
                  className="hover:text-accent transition-colors"
                >
                  Recordings
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-accent transition-colors"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact/Connect Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
              Inquiries
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <a
                href="mailto:contact@davidfelder.com"
                className="hover:text-accent transition-colors break-all"
              >
                contact@davidfelder.com
              </a>
              <div className="pt-2">
                <p className="text-xs font-mono text-background/40 uppercase tracking-widest mb-2">
                  Social
                </p>
                <a
                  href="https://soundcloud.com/david-felder"
                  target="_blank"
                  className="text-sm hover:text-accent transition-colors"
                >
                  SoundCloud
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-background/40">
            &copy; {currentYear} David Felder. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[10px] font-mono uppercase tracking-widest text-background/40 hover:text-accent transition-colors"
          >
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
};
