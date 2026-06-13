import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Surya Perabathula — Product Builder & Developer" },
      {
        name: "description",
        content:
          "Surya Perabathula builds practical digital products solving real-world problems. Creator of VillageFinder and Tasks To Do.",
      },
      { property: "og:title", content: "Surya Perabathula — Product Builder & Developer" },
      { property: "og:description", content: "Building technology that solves real-world problems." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ---------------- helpers ---------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const dur = 1400;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------- icons ---------------- */
const I = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  down: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  problem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" /> <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
    </svg>
  ),
  solution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  impact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
    </svg>
  ),
};

/* ---------------- component ---------------- */

function Portfolio() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { l: "Home", h: "#home" },
    { l: "Projects", h: "#projects" },
    { l: "Journey", h: "#journey" },
    { l: "Skills", h: "#skills" },
    { l: "Building", h: "#building" },
    { l: "Contact", h: "#contact" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${encodeURIComponent(
      form.message,
    )}`;
    window.location.href = `mailto:suryaperabathula@gmail.com?subject=Portfolio%20Inquiry&body=${body}`;
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D0F] text-foreground overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-300 ${
          scrolled ? "w-[min(95%,1100px)]" : "w-[min(95%,1180px)]"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <a href="#home" className="font-display text-lg font-bold tracking-tight">
            <span className="text-primary">SURYA</span>
            <span className="text-foreground"> P.</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.l}
                href={n.h}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {n.l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 md:inline-flex"
          >
            Let's talk
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-foreground md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-3 md:hidden">
            {nav.map((n) => (
              <a
                key={n.l}
                href={n.h}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {n.l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-center justify-center px-5 pt-24">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 grid-bg grid-lines-move" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0D0D0F]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="reveal mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Product Builder · Developer · Aspiring Entrepreneur
          </div>

          <h1 className="reveal font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-gradient sm:text-7xl md:text-8xl">
            SURYA
            <br />
            PERABATHULA
          </h1>

          <p className="reveal mt-8 text-lg font-medium text-accent sm:text-xl">
            Building technology that solves real-world problems.
          </p>
          <p className="reveal mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            I design, build, and ship practical digital products focused on productivity, local commerce, and rural
            community impact.
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="pulse-glow group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              View My Projects
              <span className="transition-transform group-hover:translate-x-1">{I.arrow}</span>
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-foreground hover-lift"
            >
              Get In Touch
            </a>
          </div>

          <div className="scroll-arrow absolute -bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground">
            {I.down}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="relative px-5 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { n: 2, s: "", l: "Products Built" },
            { n: 3, s: "", l: "Languages Supported" },
            { n: 100, s: "+", l: "Inventory Items Managed" },
            { n: 1, s: "", l: "Rural Commerce Platform" },
          ].map((m, i) => (
            <div key={i} className="reveal glass hover-lift rounded-2xl p-6 text-center">
              <div className="font-display text-5xl font-bold text-primary">
                <Counter to={m.n} suffix={m.s} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY I BUILD */}
      <section className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-12 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 01</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Why I Build</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="reveal">
              <div className="surface rounded-3xl p-8 md:p-10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary/60">
                  <path d="M7 7h4v4H7c0 4 3 5 3 5v2s-7-1-7-7V7zm10 0h4v4h-4c0 4 3 5 3 5v2s-7-1-7-7V7z" />
                </svg>
                <p className="mt-6 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  I don't just study technology — I use it to{" "}
                  <span className="text-accent">build things that matter.</span>
                </p>
              </div>
            </div>
            <div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Most people learn to code by building todo apps and stopwatch timers. I did too — but I couldn't stop
                there.
              </p>
              <p>
                I noticed a real problem: people in villages waste hours traveling between shops just to check product
                availability. No app existed to solve this. So I built one.
              </p>
              <p>
                <span className="text-foreground font-medium">VillageFinder</span> started as an idea and became a
                multilingual marketplace connecting villagers with local shopkeepers. Building it taught me more than
                any course ever could — Supabase backends, role-based auth, voice search, WhatsApp integration, real
                product thinking.
              </p>
              <p>
                I'm also building toward cloud infrastructure. AWS DevOps and scalable architecture are my next
                frontier — because products need to grow, and I intend to build ones that do.
              </p>
              <p className="text-foreground">
                My goal isn't just to get hired. It's to build technology startups that solve real problems for real
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          {/* VillageFinder */}
          <div className="reveal mb-10 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 02 · Flagship Product</span>
          </div>

          <div className="reveal surface relative overflow-hidden rounded-3xl p-6 md:p-10">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
              {/* LEFT */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Flagship Product
                </div>
                <h3 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                  VillageFinder
                </h3>
                <p className="mt-3 text-lg text-muted-foreground">
                  Bringing village commerce online — one shop at a time.
                </p>

                <div className="mt-8 space-y-6">
                  <InfoBlock icon={I.problem} label="Problem" tint="text-rose-300">
                    People in Indian villages waste valuable time traveling between shops just to check if a product
                    is available. No digital solution existed for rural local commerce.
                  </InfoBlock>
                  <InfoBlock icon={I.solution} label="Solution" tint="text-emerald-300">
                    VillageFinder lets customers instantly search products across nearby village shops — before
                    leaving home. Shopkeepers get a digital storefront to manage inventory and reach customers.
                  </InfoBlock>

                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                      {I.impact} Impact
                    </div>
                    <ul className="grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
                      <li>· Reduces wasted travel time</li>
                      <li>· Increases local shopkeeper visibility</li>
                      <li>· Brings rural commerce into the digital age</li>
                      <li>· Empowers communities through accessible tech</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT — phone mockup */}
              <div className="flex items-start justify-center">
                <PhoneMock label="Product Search" gradient="from-indigo-500 via-violet-500 to-blue-600">
                  <div className="space-y-2">
                    <div className="h-7 rounded-lg bg-white/20" />
                    <div className="h-20 rounded-xl bg-white/15" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-lg bg-white/15" />
                      <div className="h-16 rounded-lg bg-white/15" />
                      <div className="h-16 rounded-lg bg-white/15" />
                      <div className="h-16 rounded-lg bg-white/15" />
                    </div>
                  </div>
                </PhoneMock>
              </div>
            </div>

            {/* Features */}
            <div className="relative mt-12">
              <div className="mb-4 text-sm font-semibold text-foreground">Features</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  ["🌐", "Multilingual (EN · TE · HI)"],
                  ["🎙️", "Voice Search"],
                  ["🔍", "Product Search"],
                  ["📦", "Inventory Management"],
                  ["👤", "Customer Dashboard"],
                  ["🏪", "Shopkeeper Dashboard"],
                  ["📍", "Live Shop Location"],
                  ["💬", "WhatsApp Integration"],
                  ["🔴", "Open / Close Status"],
                  ["🔐", "Role-Based Auth"],
                  ["⚡", "Supabase Backend"],
                  ["📱", "Mobile Responsive"],
                ].map(([e, t]) => (
                  <div
                    key={t}
                    className="glass hover-lift flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-foreground"
                  >
                    <span>{e}</span>
                    <span className="truncate">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech & architecture */}
            <div className="relative mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-3 text-sm font-semibold text-foreground">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {["HTML", "CSS", "JavaScript", "Supabase", "Lovable AI", "WhatsApp API"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 text-sm font-semibold text-foreground">Architecture</div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  {[
                    "Customer App",
                    "Product Search",
                    "Supabase DB",
                    "Shopkeeper Dashboard",
                    "Inventory Update",
                  ].map((s, i, a) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-foreground/90">
                        {s}
                      </span>
                      {i < a.length - 1 && <span className="text-primary">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Challenges */}
            <div className="relative mt-12">
              <div className="mb-4 text-sm font-semibold text-foreground">Challenges Solved</div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Multilingual UX", "Built a seamless language switch for English, Telugu, and Hindi users."],
                  ["Role-Based Auth", "Separate dashboards and permissions for customers vs shopkeepers."],
                  ["Rural Accessibility", "Voice search and WhatsApp integration for low-tech users."],
                ].map(([t, d], i) => (
                  <div key={t} className="glass hover-lift rounded-2xl p-5">
                    <div className="mb-2 text-xs font-mono text-accent">0{i + 1}</div>
                    <div className="font-semibold text-foreground">{t}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future vision */}
            <div className="relative mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-5">
              <div className="mb-3 text-sm font-semibold text-accent">Future Vision</div>
              <ul className="grid gap-2 text-sm text-foreground/90 md:grid-cols-2">
                <li>· Onboard 50+ real village shopkeepers</li>
                <li>· Add order placement and delivery tracking</li>
                <li>· Expand to more regional languages</li>
                <li>· Launch mobile app (React Native)</li>
              </ul>
            </div>

            {/* Gallery */}
            <div className="relative mt-12">
              <div className="mb-6 text-sm font-semibold text-foreground">Screenshots</div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <PhoneMock label="Product Search" gradient="from-indigo-500 via-violet-600 to-blue-700">
                  <FakeUI variant="search" />
                </PhoneMock>
                <PhoneMock label="Shopkeeper Dashboard" gradient="from-cyan-400 via-sky-500 to-teal-600">
                  <FakeUI variant="dash" />
                </PhoneMock>
                <PhoneMock label="Multilingual UI" gradient="from-purple-500 via-fuchsia-500 to-pink-600">
                  <FakeUI variant="lang" />
                </PhoneMock>
              </div>
            </div>
          </div>

          {/* Tasks To Do */}
          <div className="reveal mt-24 mb-8 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 03 · Also Built</span>
          </div>
          <div className="reveal surface relative overflow-hidden rounded-3xl p-6 md:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <h3 className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">Tasks To Do</h3>
                <p className="mt-2 text-lg text-muted-foreground">
                  Don't let missed tasks pile up — reschedule and recover.
                </p>
                <div className="mt-6 space-y-5">
                  <InfoBlock icon={I.problem} label="Problem" tint="text-rose-300">
                    Most task apps mark missed tasks as "overdue" and leave them there — creating a growing pile of
                    guilt and ignored work.
                  </InfoBlock>
                  <InfoBlock icon={I.solution} label="Solution" tint="text-emerald-300">
                    Tasks To Do helps users recover from missed tasks with smart rescheduling so productivity keeps
                    moving forward.
                  </InfoBlock>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    ["✅", "Task Creation"],
                    ["🗂️", "Categories & Labels"],
                    ["⏰", "Reminders"],
                    ["🔍", "Search & Filtering"],
                    ["📊", "Progress Tracking"],
                    ["🔄", "Smart Rescheduling"],
                  ].map(([e, t]) => (
                    <div key={t} className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                      <span>{e}</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["HTML", "CSS", "JavaScript", "Local Storage"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <PhoneMock label="Task Dashboard" gradient="from-emerald-400 via-teal-500 to-green-600">
                  <FakeUI variant="tasks" />
                </PhoneMock>
                <PhoneMock label="Smart Reschedule" gradient="from-orange-400 via-amber-500 to-yellow-500">
                  <FakeUI variant="resched" />
                </PhoneMock>
              </div>
            </div>
          </div>

          {/* Builder Philosophy */}
          <div className="reveal mt-24">
            <div className="surface relative overflow-hidden rounded-3xl p-8 md:p-12">
              <div className="absolute -left-20 top-0 h-full w-1 bg-gradient-to-b from-primary via-accent to-transparent" />
              <h3 className="font-display text-3xl font-bold text-foreground sm:text-4xl">My Builder Philosophy</h3>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Technology is most valuable when it solves practical problems for real people. I don't build things
                  to impress — I build things to work.
                </p>
                <p>
                  Every product I make starts with a real problem I've witnessed. Every feature is earned by asking:
                  does this actually help someone?
                </p>
                <p className="text-foreground">
                  That's the standard I hold myself to, and the kind of builder I'm working to become.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-12 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 04</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">What I Work With</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SkillGroup
              title="Development"
              items={[
                ["</>", "HTML"],
                ["🎨", "CSS"],
                ["⚡", "JavaScript"],
                ["🟢", "Supabase"],
                ["💜", "Lovable AI"],
              ]}
            />
            <SkillGroup
              title="Cloud & DevOps · Learning"
              items={[
                ["☁️", "AWS DevOps"],
                ["🌩️", "Cloud Computing"],
                ["🐧", "Linux Fundamentals"],
              ]}
            />
            <SkillGroup
              title="Tools"
              items={[
                ["🌿", "Git"],
                ["🐙", "GitHub"],
                ["🧩", "VS Code"],
                ["🛢️", "Supabase Studio"],
              ]}
            />
            <SkillGroup
              title="Product Thinking"
              items={[
                ["🎯", "UI/UX Design"],
                ["🧠", "Problem Solving"],
                ["📐", "Product Strategy"],
                ["🤖", "AI-Assisted Dev"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* CURRENTLY BUILDING */}
      <section id="building" className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-4 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 05</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Currently Building</h2>
          </div>
          <div className="reveal mb-10 flex flex-wrap items-center gap-3 text-muted-foreground">
            <span>Active development — VillageFinder</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> In Active Development
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <RoadCard
              tag="✅ Recently Shipped"
              tint="text-emerald-300"
              items={["Voice search feature", "Multilingual UI (3 languages)", "Shopkeeper dashboard v1"]}
            />
            <RoadCard
              tag="🔨 In Progress"
              tint="text-amber-300"
              items={["WhatsApp notification system", "Shop location maps integration", "Inventory alerts"]}
            />
            <RoadCard
              tag="🔜 Coming Soon"
              tint="text-sky-300"
              items={["Order placement flow", "Customer review system", "Mobile app planning"]}
            />
            <RoadCard
              tag="🌍 Big Picture"
              tint="text-fuchsia-300"
              items={[
                "Onboard real village shopkeepers",
                "Expand to 5+ regional languages",
                "Launch publicly",
              ]}
            />
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="relative px-5 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="reveal mb-12 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 06</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">My Journey</h2>
          </div>

          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-4" />
            {[
              ["2024", "The Beginning", "Started exploring software development, web technologies, and what it means to build real products."],
              ["2025", "First Launch", "Built and shipped Tasks To Do — a productivity app focused on smart task rescheduling. First complete product."],
              ["2026", "Flagship Product", "Designed and built VillageFinder — a multilingual village marketplace platform connecting shoppers and shopkeepers."],
              ["Now", "Scaling Up", "Learning AWS DevOps and cloud computing. Improving VillageFinder. Exploring what it means to build a real technology startup."],
            ].map(([year, title, desc]) => (
              <div key={title} className="reveal relative mb-10 last:mb-0">
                <div className="absolute -left-[26px] top-1.5 h-4 w-4 rounded-full bg-primary shadow-[0_0_0_4px_rgba(99,102,241,0.2),0_0_24px_rgba(99,102,241,0.6)] md:-left-[34px]" />
                <div className="surface rounded-2xl p-6">
                  <div className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{year}</div>
                  <div className="font-display text-2xl font-bold text-foreground">{title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S NEXT */}
      <section className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-12 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 07</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">What's Next</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🛒", "Onboard real shopkeepers onto VillageFinder"],
              ["🌐", "Expand multilingual support (5+ languages)"],
              ["☁️", "Master AWS DevOps and cloud architecture"],
              ["📱", "Build VillageFinder mobile app"],
              ["🚀", "Launch first public product"],
              ["🏗️", "Build and launch a technology startup"],
            ].map(([e, t], i) => (
              <div key={i} className="reveal surface hover-lift rounded-2xl p-6">
                <div className="text-3xl">{e}</div>
                <div className="mt-3 text-base font-medium text-foreground">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE VISION BENTO */}
      <section className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-12 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 08</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Where I'm Headed</h2>
          </div>

          <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-4">
            <div className="reveal surface hover-lift col-span-2 row-span-2 flex flex-col justify-between rounded-3xl p-6 md:p-8 bg-gradient-to-br from-primary/15 via-transparent to-transparent">
              <div className="text-4xl">🌾</div>
              <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Scale VillageFinder into a real rural commerce platform
              </div>
            </div>
            <div className="reveal surface hover-lift col-span-2 row-span-2 flex flex-col justify-between rounded-3xl p-6 md:p-8 bg-gradient-to-br from-accent/15 via-transparent to-transparent">
              <div className="text-4xl">🚀</div>
              <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Launch a technology startup that solves meaningful problems
              </div>
            </div>
            {[
              ["☁️", "Master AWS DevOps"],
              ["🏗️", "Build scalable cloud solutions"],
              ["🤝", "Empower rural communities"],
              ["💡", "Keep building. Keep learning."],
            ].map(([e, t]) => (
              <div key={t} className="reveal surface hover-lift flex flex-col justify-between rounded-2xl p-5">
                <div className="text-2xl">{e}</div>
                <div className="text-sm font-medium text-foreground">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-4 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">/ 09</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-6xl">Let's Build Something</h2>
          </div>
          <p className="reveal mb-12 max-w-2xl text-base text-muted-foreground">
            Whether you're a recruiter, collaborator, mentor, or just curious — I'd love to connect.
          </p>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <form onSubmit={handleSubmit} className="reveal surface space-y-4 rounded-3xl p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me what you're thinking..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                type="submit"
                className="pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground sm:w-auto"
              >
                Send Message {I.arrow}
              </button>
            </form>

            <div className="space-y-4">
              <ContactLink
                href="mailto:suryaperabathula@gmail.com"
                icon="📧"
                label="Email"
                value="suryaperabathula@gmail.com"
              />
              <ContactLink
                href="https://github.com/SuryaAGS"
                icon="💻"
                label="GitHub"
                value="github.com/SuryaAGS"
              />
              <ContactLink
                href="https://www.linkedin.com/in/surya-perabathula-08124a322"
                icon="🔗"
                label="LinkedIn"
                value="linkedin.com/in/surya-perabathula"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
          <div className="text-foreground/80">
            <span className="font-display font-bold">SURYA PERABATHULA</span> — Building what matters.
          </div>
          <div className="flex items-center gap-3">
            <SocialIcon href="https://github.com/SuryaAGS" label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .5C5.7.5.5 5.7.5 12.1c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/surya-perabathula-08124a322" label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.7 5 6.3V21h-4v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="mailto:suryaperabathula@gmail.com" label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </SocialIcon>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground/70">
          Designed & Built by Surya Perabathula · 2026
        </div>
      </footer>
    </div>
  );
}

/* ---------------- subcomponents ---------------- */

function InfoBlock({
  icon,
  label,
  tint,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className={`mb-2 flex items-center gap-2 text-sm font-semibold ${tint}`}>
        {icon} {label}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function PhoneMock({
  children,
  label,
  gradient,
}: {
  children?: React.ReactNode;
  label: string;
  gradient: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[220px] rounded-[2.2rem] border border-white/10 bg-[#0a0a0d] p-2.5 shadow-2xl">
        <div className="absolute left-1/2 top-2.5 z-10 h-4 w-20 -translate-x-1/2 rounded-b-2xl bg-black" />
        <div className={`relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative h-full p-4 pt-8 text-white">{children}</div>
        </div>
      </div>
      <div className="mt-3 text-xs font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

function FakeUI({ variant }: { variant: "search" | "dash" | "lang" | "tasks" | "resched" }) {
  if (variant === "search")
    return (
      <div className="space-y-2.5">
        <div className="h-8 rounded-lg bg-white/25 flex items-center px-2 text-[10px]">🔍 Search products...</div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-white/20" />
          ))}
        </div>
      </div>
    );
  if (variant === "dash")
    return (
      <div className="space-y-2.5">
        <div className="text-[11px] font-bold">Shop Dashboard</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/25 p-2 text-[9px]">Items<br/><b>104</b></div>
          <div className="rounded-lg bg-white/25 p-2 text-[9px]">Open<br/><b>●</b></div>
        </div>
        <div className="space-y-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-5 rounded bg-white/20" />
          ))}
        </div>
      </div>
    );
  if (variant === "lang")
    return (
      <div className="space-y-2">
        <div className="text-[11px] font-bold">Language</div>
        {["English", "తెలుగు", "हिन्दी"].map((l, i) => (
          <div
            key={l}
            className={`rounded-lg px-3 py-2 text-[11px] ${i === 0 ? "bg-white/35 font-bold" : "bg-white/15"}`}
          >
            {l}
          </div>
        ))}
      </div>
    );
  if (variant === "tasks")
    return (
      <div className="space-y-2">
        <div className="text-[11px] font-bold">Today's Tasks</div>
        {["Ship MVP", "Call mentor", "Review PR", "Plan demo"].map((t, i) => (
          <div key={t} className="flex items-center gap-2 rounded-lg bg-white/20 px-2 py-1.5 text-[10px]">
            <span className={`h-3 w-3 rounded ${i < 2 ? "bg-white" : "border border-white/60"}`} />
            {t}
          </div>
        ))}
      </div>
    );
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-bold">Reschedule</div>
      <div className="rounded-lg bg-white/25 p-2.5 text-[10px]">
        <div>Missed: Workout</div>
        <div className="mt-1 opacity-80">→ Move to tomorrow 7am</div>
      </div>
      <div className="rounded-lg bg-white/15 p-2.5 text-[10px]">
        <div>Missed: Read 20 pgs</div>
        <div className="mt-1 opacity-80">→ Tonight 9pm</div>
      </div>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="reveal surface hover-lift rounded-3xl p-6">
      <div className="mb-4 text-xs font-mono uppercase tracking-widest text-accent">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map(([e, t]) => (
          <div
            key={t}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            <span>{e}</span>
            <span className="text-foreground">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadCard({ tag, tint, items }: { tag: string; tint: string; items: string[] }) {
  return (
    <div className="reveal surface hover-lift rounded-2xl p-6">
      <div className={`mb-3 text-sm font-semibold ${tint}`}>{tag}</div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: string;
  label: string;
  value: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="reveal glass hover-lift group flex items-center gap-4 rounded-2xl p-5"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-xl">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium text-foreground">{value}</div>
      </div>
      <span className="text-muted-foreground transition-transform group-hover:translate-x-1">{I.arrow}</span>
    </a>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
    >
      {children}
    </a>
  );
}
