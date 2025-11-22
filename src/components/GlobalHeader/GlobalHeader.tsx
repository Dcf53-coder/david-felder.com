import { NavLink } from "./NavLink"

export const GlobalHeader = () => {
  return (
    <div id="global-header" className="bg-gray-200/50 backdrop-blur-2xl border-b border-gray-300">
      <div className="container mx-auto flex align-center justify-between py-6">
        <div id="logo" className="font-bold text-xl"><a href="/">David Felder</a></div>
        <nav id="main-nav">
          <ul className="flex gap-4 text-lg">
            <li><NavLink href="/works">Works</NavLink></li>
            <li><NavLink href="/programming">Programming</NavLink></li>
            <li><NavLink href="/recordings">Recordings</NavLink></li>
            <li><NavLink href="/reviews">Reviews</NavLink></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
