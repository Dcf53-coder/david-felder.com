import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Info | David Felder",
  description:
    "Professional appointments, academic history, and contact information for composer David Felder.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-6xl">
        {/* Header Section */}
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">
            Contact
          </h1>
          <div className="h-2 w-32 bg-accent" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Direct Contact & Appointments */}
          <div className="lg:col-span-5 space-y-12">
            <section>
              <h2 className="text-sm font-mono uppercase tracking-widest text-accent mb-6 font-bold">
                Direct Contact
              </h2>
              <a
                href="mailto:felder@david-felder.com"
                className="text-2xl md:text-3xl font-black hover:text-accent transition-colors break-all"
              >
                felder@david-felder.com
              </a>
              <p className="mt-4 text-gray-500 font-mono text-xs uppercase tracking-tight">
                Ph.D. University of California at San Diego
              </p>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-sm font-mono uppercase tracking-widest text-accent mb-6 font-bold">
                Professional Appointments
              </h2>
              <ul className="space-y-4 text-lg font-bold leading-tight uppercase tracking-tight">
                <li>SUNY Distinguished Professor Emeritus</li>
                <li>Birge-Cary Chair in Music Composition</li>
                <li>Director, Center for 21st-Century Music</li>
                <li>Director, June in Buffalo Festival</li>
                <li>Artistic Director, Slee Sinfonietta</li>
              </ul>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-sm font-mono uppercase tracking-widest text-accent mb-6 font-bold">
                Publishing & Records
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-mono text-gray-400 mb-1">
                    Main Publisher
                  </p>
                  <p className="text-xl font-bold uppercase">
                    Theodore Presser Company
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-400 mb-1">
                    Affiliate
                  </p>
                  <p className="text-xl font-bold uppercase">
                    Project Schott New York
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-400 mb-1">Labels</p>
                  <p className="text-md font-medium text-gray-600">
                    Albany, Bridge, Coviello, BMOP/sound, Mode, EMF
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Detailed Biography & Legacy */}
          <div className="lg:col-span-7 space-y-12 bg-gray-50 p-8 md:p-12 rounded-xl">
            <section className="pt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-accent mb-6 font-bold">
                Select Awards & Honors
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-tighter">
                <li className="flex items-start gap-2">
                  <span>—</span> American Academy of Arts and Letters
                </li>
                <li className="flex items-start gap-2">
                  <span>—</span> Guggenheim Fellowship
                </li>
                <li className="flex items-start gap-2">
                  <span>—</span> Two Koussevitzky Commissions
                </li>
                <li className="flex items-start gap-2">
                  <span>—</span> Two Fromm Foundation Fellowships
                </li>
                <li className="flex items-start gap-2">
                  <span>—</span> Rockefeller Foundation Awards
                </li>
                <li className="flex items-start gap-2">
                  <span>—</span> National Endowment for the Arts
                </li>
              </ul>
            </section>

            <footer className="pt-8 text-sm font-mono text-gray-400 italic">
              David Felder retired from over 40 years of teaching and mentoring
              in March of 2023.
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
