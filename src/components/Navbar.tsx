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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { label: "Works",   href: "#works",   num: "01" },
    { label: "About",   href: "#about",   num: "02" },
    { label: "Process", href: "#process", num: "03" },
  ];

  return (
    <>
      {/* ── Header bar (always above overlay) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          !menuOpen && scrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-sage-light/30 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo — cream when menu is open */}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className={`font-heading text-3xl tracking-normal transition-colors duration-300 hover:text-rose ${
              menuOpen ? "text-cream" : "text-bark"
            }`}
          >
            chan.inked
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
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

          {/* Desktop CTA */}
          <a
            href="https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase px-6 py-2.5 bg-rose text-cream hover:bg-bark transition-all duration-300 rounded-full font-semibold shadow-md"
          >
            Book Now
          </a>

          {/* Mobile — morphing hamburger → × */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center z-[70]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute block w-6 h-px transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${
                menuOpen ? "rotate-45 bg-cream" : "-translate-y-[7px] bg-bark"
              }`}
            />
            <span
              className={`absolute block h-px transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${
                menuOpen ? "w-0 opacity-0 bg-cream" : "w-6 opacity-100 bg-bark"
              }`}
            />
            <span
              className={`absolute block w-6 h-px transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${
                menuOpen ? "-rotate-45 bg-cream" : "translate-y-[7px] bg-bark"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* ── Full-screen menu overlay ── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          backgroundColor: "#3D2F22",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.75s cubic-bezier(.76,0,.24,1)",
          overflow: "hidden",
        }}
      >
        {/* Botanical decoration — flower-long at right edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-long.svg"
          alt=""
          className="absolute right-0 top-0 h-full w-auto opacity-[0.07] pointer-events-none select-none"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* one-flower-pink — bottom left accent */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/one-flower-pink.png"
          alt=""
          className="absolute -bottom-10 -left-10 w-52 h-auto opacity-[0.08] pointer-events-none select-none rotate-12"
        />

        {/* Content wrapper */}
        <div className="h-full flex flex-col px-8 pt-28 pb-10">

          {/* Top divider — scaleX reveal */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(250,248,242,0.12)",
              transformOrigin: "left",
              transform: menuOpen ? "scaleX(1)" : "scaleX(0)",
              transition: menuOpen
                ? "transform 0.7s cubic-bezier(.76,0,.24,1) 0.15s"
                : "none",
              marginBottom: "2.5rem",
            }}
          />

          {/* Nav items */}
          <nav className="flex-1 flex flex-col justify-center gap-0">
            {links.map((link, i) => (
              <div
                key={link.label}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(48px)",
                  transition: menuOpen
                    ? `opacity 0.65s ease ${0.22 + i * 0.1}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${0.22 + i * 0.1}s`
                    : "none",
                }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="menu-link flex items-end gap-3 py-1"
                >
                  {/* Index number */}
                  <span className="text-[10px] tracking-[0.3em] text-cream/25 font-body mb-3 select-none">
                    {link.num}
                  </span>

                  {/* Big label */}
                  <span
                    className="font-heading text-cream/90 leading-none relative active:text-rose"
                    style={{ fontSize: "clamp(3.8rem, 18vw, 7rem)", transition: "color 0.25s ease" }}
                  >
                    {link.label}
                    {/* Underline that grows on hover via CSS */}
                    <span className="menu-underline absolute bottom-1 left-0 h-px bg-rose" />
                  </span>
                </a>

                {/* Item separator */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(250,248,242,0.07)",
                    transformOrigin: "left",
                    transform: menuOpen ? "scaleX(1)" : "scaleX(0)",
                    transition: menuOpen
                      ? `transform 0.6s cubic-bezier(.76,0,.24,1) ${0.3 + i * 0.1}s`
                      : "none",
                  }}
                />
              </div>
            ))}
          </nav>

          {/* Bottom CTA area */}
          <div
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              transition: menuOpen
                ? "opacity 0.6s ease 0.55s, transform 0.6s cubic-bezier(.22,1,.36,1) 0.55s"
                : "none",
            }}
          >
            <a
              href="https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between w-full px-6 py-4 rounded-full border border-cream/20 text-cream/80 text-xs tracking-[0.25em] uppercase hover:bg-cream/8 active:bg-cream/10 transition-colors duration-300 mb-6 group"
            >
              <span>Book a Session</span>
              <span className="text-base leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>

            <div className="flex items-center justify-between">
              <p className="text-cream/20 text-[10px] tracking-[0.25em] uppercase">
                Fleetwood B.C
              </p>
              <a
                href="https://www.instagram.com/chan.inkedd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/30 hover:text-cream/60 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
