"use client";
import { useEffect, useRef } from "react";
import { FloralDivider } from "./FlowerDecor";

const steps = [
  {
    num: "01",
    title: "Reach Out",
    tag: "Getting Started",
    desc: "Slide into my Instagram DMs (@chan.inkedd) with a reference photo, ideally something from my previous work that resonates with you. The more detail you include upfront, the smoother everything flows.",
    bg: "#F0EAD8",
    img: "/tattoos/reach-out.jpg",
    noOverlay: true,
  },
  {
    num: "02",
    title: "Consultation",
    tag: "Let's Connect",
    desc: "I'll send over a quick questionnaire: name, pronouns, placement, size, colour preferences, design description, preferred date, and any skin conditions I should know. Once that's filled out, the specifics get ironed out from there.",
    bg: "#FAF8F2",
    img: "/tattoos/consultation.jpg",
    noOverlay: true,
  },
  {
    num: "03",
    title: "Custom Design",
    tag: "The Art",
    desc: "I take your ideas, brainstorm with you, and bring them to life by sketching draft by draft until it's perfect. No templates. Every piece is drawn from scratch and made entirely for you.",
    bg: "#FBF0EE",
    img: "/tattoos/custom-design.jpg",
    noOverlay: true,
  },
  {
    num: "04",
    title: "Tattoo Day",
    tag: "Forever",
    desc: "We review the final stencil together, then make it permanent. I love getting to know everyone, not just why you're getting the tattoo, but who you are. Every session is a baptism moment. This is the good part.",
    bg: "#F4D5D5",
    img: "/dyane-portrait2.png",
    noOverlay: true,
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mobile = () => window.innerWidth < 768;

    const updateLayout = () => {
      if (!containerRef.current) return;
      const isMob = mobile();
      const mult = isMob ? 45 : 100;
      // Mobile: need (n-1)*step + 100vh so the last card stays pinned
      const containerVh = isMob
        ? (steps.length - 1) * mult + 100
        : (steps.length + 0.3) * mult;
      containerRef.current.style.height = `${containerVh}vh`;

      // Position cards: centered on mobile (20vh for 60vh card), top-aligned on desktop
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        card.style.top = isMob
          ? `calc(20vh + ${i * 18}px)`
          : `calc(5vh + ${i * 28}px)`;
      });
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);

    const handle = () => {
      if (!containerRef.current) return;
      const scrolled = -containerRef.current.getBoundingClientRect().top;
      const wh = window.innerHeight;
      // Match step size to the container multiplier
      const stepPx = mobile() ? wh * 0.45 : wh;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const progress    = Math.max(0, Math.min(1, (scrolled - i * stepPx) / stepPx));
        const targetScale = 1 - (steps.length - 1 - i) * 0.05;
        const scale       = 1 - progress * (1 - targetScale);
        card.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", handle);
    };
  }, []);

  return (
    <section id="process">

      {/* ── Header ── */}
      <div className="relative bg-parchment/50 overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/one-flower-pink.png"
          alt=""
          className="absolute top-1/2 -translate-y-1/2 -left-24 w-48 md:w-96 h-auto opacity-40 pointer-events-none select-none"
        />

        <div className="relative z-10 px-6 md:px-16 text-right">
          <h2 className="font-heading text-[3.5rem] md:text-[7rem] lg:text-[9rem] leading-[0.85]" style={{ color: '#bcc1a1' }}>
            The Process
          </h2>
        </div>
      </div>

      {/* ── Sticky cards ── */}
      <div
        ref={containerRef}
        className="relative bg-parchment/50"
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            ref={el => { cardRefs.current[i] = el; }}
            style={{
              position: "sticky",
              zIndex: i + 1,
              transformOrigin: "top center",
              backgroundColor: step.bg,
            }}
            className="mx-4 md:mx-32 lg:mx-48 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl h-[60vh] md:h-[80vh]"
          >
            <div className="h-full flex flex-col md:grid md:grid-cols-2 relative overflow-hidden">

              {/* Top / Left: image */}
              <div className="relative overflow-hidden md:h-full" style={{ flex: "0 0 55%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.img}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {!step.noOverlay && (
                  <>
                    <div className="absolute inset-0" style={{ background: `${step.bg}44` }} />
                    {/* Mobile: fade to bottom; desktop: fade to right */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-10 md:hidden"
                      style={{ background: `linear-gradient(to bottom, transparent, ${step.bg})` }}
                    />
                    <div
                      className="hidden md:block absolute inset-y-0 right-0 w-24"
                      style={{ background: `linear-gradient(to right, transparent, ${step.bg})` }}
                    />
                  </>
                )}
              </div>

              {/* Bottom / Right: content */}
              <div className="flex flex-col justify-center px-4 py-3 md:px-16 md:py-0 relative z-10 h-full" style={{ flex: "1 1 auto" }}>
                {/* Num label */}
                <span className="hidden md:block text-xs tracking-[0.3em] uppercase text-bark/40 mb-4">
                  Step {step.num}
                </span>

                {/* Title + desc */}
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-[clamp(2rem,8vw,5rem)] text-bark leading-[0.9] mb-4 md:mb-6">
                    {step.title}
                  </h3>
                  <p className="font-body text-bark/80 text-base md:text-lg leading-relaxed line-clamp-4 md:line-clamp-none max-w-md">
                    {step.desc}
                  </p>
                </div>

                {/* Floral divider — desktop only */}
                <FloralDivider className="hidden md:block w-28 opacity-30 mt-8" />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── CTA below cards ── */}
      <div className="py-24 text-center bg-parchment/50">
        <a
          href="https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-rose text-cream text-xs tracking-[0.2em] uppercase rounded-full hover:bg-bark transition-all duration-300"
        >
          Start Your Journey
        </a>
      </div>

    </section>
  );
}
