import { SmallFlower } from "./FlowerDecor";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream pt-40">
      {/* Soft gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blush/30 blur-3xl -translate-x-1/2 -translate-y-1/4 pointer-events-none anim-float" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-sage-pale/40 blur-3xl translate-x-1/3 translate-y-1/4 pointer-events-none anim-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-mint/20 blur-3xl pointer-events-none anim-float" style={{ animationDelay: "3.5s" }} />

      {/* Small flower top center */}
      <div className="absolute top-56 anim-fade-in" style={{ animationDelay: "900ms" }}>
        <SmallFlower className="w-8 h-8 opacity-60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">

        {/* Main heading */}
        <div className="anim-fade-up" style={{ animationDelay: "80ms" }}>
          <h1 className="font-heading text-[clamp(5rem,16vw,11rem)] leading-none text-bark tracking-tight mb-2">
            chan.inked
          </h1>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-3 my-6 anim-fade-in" style={{ animationDelay: "350ms" }}>
          <div className="w-12 h-px bg-sage-light" />
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-sage opacity-70">
            <path d="M12 2C8 8 4 10 2 12c2 2 6 4 10 10 4-6 8-8 10-10-2-2-6-4-10-10z" />
          </svg>
          <div className="w-12 h-px bg-sage-light" />
        </div>

        {/* Eyebrow */}
        <div className="anim-fade-up" style={{ animationDelay: "480ms" }}>
          <p className="text-lg tracking-[0.18em] text-bark-light mb-6">
            Tattoo Artist in Fleetwood B.C @ Ink House
          </p>
        </div>

        <div className="anim-fade-up" style={{ animationDelay: "620ms" }}>
          <p className="text-sm text-bark-light/70 tracking-wide mb-10 max-w-md leading-relaxed">
            Delicate botanical tattoos crafted with intention and care.
            Each piece is a tiny garden that lives with you forever.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto anim-fade-up" style={{ animationDelay: "780ms" }}>
          <a
            href="#works"
            className="px-8 py-3.5 bg-rose text-cream text-xs tracking-[0.2em] uppercase rounded-full hover:bg-bark transition-all duration-300 hover:shadow-lg text-center"
          >
            View My Work
          </a>
          <a
            href="https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-bark/25 text-bark text-xs tracking-[0.2em] uppercase rounded-full hover:border-rose hover:text-rose transition-all duration-300 text-center"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce anim-fade-in" style={{ animationDelay: "1300ms" }}>
        <div className="w-px h-10 bg-gradient-to-b from-sage-light to-transparent" />
      </div>
    </section>
  );
}
