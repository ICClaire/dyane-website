"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open (mobile only)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { label: "Works",   href: "#works" },
    { label: "About",   href: "#about" },
    { label: "Process", href: "#process" },
  ];

  const bookUrl = "https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig";

  return (
    <>
      {/* ── Desktop header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 hidden md:block ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-sage-light/30 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            className="font-heading text-3xl tracking-normal text-bark hover:text-rose transition-colors duration-300"
          >
            chan.inked
          </a>

          <ul className="flex items-center gap-10">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-xs tracking-[0.18em] uppercase text-bark-light hover:text-rose transition-colors duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase px-6 py-2.5 bg-rose text-cream hover:bg-bark transition-all duration-300 rounded-full font-semibold shadow-md"
          >
            Book Now
          </a>
        </nav>
      </header>

      {/* ── Mobile pill navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-[60] md:hidden px-4 pt-3">
        <nav
          className={`relative flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
            scrolled || menuOpen
              ? "bg-cream/95 backdrop-blur-md shadow-lg"
              : "bg-cream/70 backdrop-blur-sm"
          }`}
        >
          {/* Left: Hamburger */}
          <button
            className="relative w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute block w-5 h-px bg-bark transition-all duration-400 ease-[cubic-bezier(.76,0,.24,1)] ${
                menuOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute block h-px bg-bark transition-all duration-400 ease-[cubic-bezier(.76,0,.24,1)] ${
                menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"
              }`}
            />
            <span
              className={`absolute block w-5 h-px bg-bark transition-all duration-400 ease-[cubic-bezier(.76,0,.24,1)] ${
                menuOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"
              }`}
            />
          </button>

          {/* Centre: Logo — absolutely centred */}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="absolute left-[45%] -translate-x-1/2 font-heading text-2xl tracking-normal text-bark hover:text-rose transition-colors duration-300"
          >
            chan.inked
          </a>

          {/* Right: Let's Talk CTA */}
          <a
            href="https://www.instagram.com/chan.inkedd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 bg-rose text-cream rounded-full font-semibold"
          >
            Let&apos;s Talk
          </a>
        </nav>

        {/* ── Dropdown menu ── */}
        <div
          className={`mt-2 rounded-2xl bg-cream/95 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3 border-b border-bark/8 last:border-0"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
                  transition: menuOpen
                    ? `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`
                    : "none",
                }}
              >
                <span className="font-body text-lg font-medium text-bark">{link.label}</span>
                <svg className="w-4 h-4 text-bark/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}

            {/* Book session in dropdown */}
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 px-6 py-3 text-cream text-xs tracking-[0.15em] uppercase rounded-full font-semibold"
              style={{
                backgroundColor: "#bcc1a1",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
                transition: menuOpen
                  ? "opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s"
                  : "none",
              }}
            >
              Book a Session
              <span>→</span>
            </a>

            <div
              className="flex items-center justify-between mt-3 pt-3 border-t border-bark/8"
              style={{
                opacity: menuOpen ? 1 : 0,
                transition: menuOpen ? "opacity 0.4s ease 0.4s" : "none",
              }}
            >
              <p className="text-bark/30 text-[10px] tracking-[0.2em] uppercase">
                Fleetwood B.C
              </p>
              <a
                href="https://www.instagram.com/chan.inkedd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bark/40 hover:text-rose text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
