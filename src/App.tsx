import { useEffect, useState } from 'react';
import { Clapperboard, Gamepad2, Film, Sparkles, Youtube, Pin } from 'lucide-react';
import { siteConfig } from './config/siteConfig';

type Notice = {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  pinned?: boolean;
};

const pillarIcons = [Clapperboard, Gamepad2, Film, Sparkles];

export default function App() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/notices/index.json`)
      .then((res) => (res.ok ? res.json() : { notices: [] }))
      .then((data: { notices?: Notice[] }) => {
        const list = [...(data.notices ?? [])].sort(
          (a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date),
        );
        setNotices(list);
      })
      .catch(() => setNotices([]));
  }, []);

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-black tracking-widest">
            NAS<span className="text-blue-500">CORE</span>
          </a>
          <div className="hidden gap-8 text-sm text-slate-400 sm:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#notices" className="hover:text-white">Notices</a>
            <a href={siteConfig.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen items-center overflow-hidden px-6">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-600/30 to-violet-600/20 blur-3xl" />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-blue-400">Independent Media Brand</p>
            <h1 className="font-display text-6xl font-black leading-none tracking-tight sm:text-8xl">
              {siteConfig.name}
            </h1>
            <p className="mt-6 font-display text-2xl text-slate-300 sm:text-3xl">{siteConfig.tagline}</p>
            <p className="mt-6 max-w-2xl text-slate-400">{siteConfig.description}</p>
            <a
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              <Youtube className="h-5 w-5" /> Watch on YouTube
            </a>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-4xl font-bold">What we create</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <Icon className="h-8 w-8 text-violet-400" />
                  <h3 className="mt-5 font-display text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-slate-400">{pillar.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="notices" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-4xl font-bold">Studio notices</h2>
          <div className="mt-12 space-y-4">
            {notices.length === 0 && <p className="text-slate-500">No announcements right now.</p>}
            {notices.map((notice) => (
              <article key={notice.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-slate-500">
                  {notice.pinned && <Pin className="h-3.5 w-3.5 text-blue-400" />}
                  <span className="text-blue-400">{notice.category}</span>
                  <span>{notice.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{notice.title}</h3>
                <p className="mt-2 text-slate-400">{notice.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </footer>
    </div>
  );
}
