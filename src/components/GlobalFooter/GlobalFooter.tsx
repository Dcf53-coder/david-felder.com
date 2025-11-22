import Link from "next/link";

export const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Title */}
          <div>
            <Link href="/" className="group">
              <span className="text-3xl font-black tracking-tight group-hover:text-accent transition-colors duration-normal ease-default">
                David Felder
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-col gap-3 text-sm font-mono uppercase tracking-wider">
              <li>
                <Link
                  href="/works"
                  className="text-background/70 hover:text-accent transition-colors duration-normal ease-default"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href="/programming"
                  className="text-background/70 hover:text-accent transition-colors duration-normal ease-default"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/recordings"
                  className="text-background/70 hover:text-accent transition-colors duration-normal ease-default"
                >
                  Recordings
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-background/70 hover:text-accent transition-colors duration-normal ease-default"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-background/20">
          <p className="text-sm text-background/50">
            &copy; {currentYear} David Felder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
