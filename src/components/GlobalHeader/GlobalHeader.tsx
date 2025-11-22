import { MobileNav } from "./MobileNav"
import { NavLink } from "./NavLink"

export const GlobalHeader = () => {
  return (
    <header id="global-header" className="bg-background/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <a href="/" className="group">
          <span className="text-2xl font-black tracking-tight text-foreground group-hover:text-accent transition-colors duration-normal ease-default">
            David Felder
          </span>
        </a>

        {/* Desktop nav */}
        <nav id="main-nav" className="hidden md:block">
          <ul className="flex gap-6 text-sm font-mono uppercase tracking-wider">
            <li><NavLink href="/works">Works</NavLink></li>
            <li><NavLink href="/programming">Programming</NavLink></li>
            <li><NavLink href="/recordings">Recordings</NavLink></li>
            <li><NavLink href="/reviews">Reviews</NavLink></li>
          </ul>
        </nav>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    </header>
  )
}
