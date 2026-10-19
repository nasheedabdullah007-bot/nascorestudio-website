import React from 'react';
import { Youtube, Instagram, Mail, MessageSquare, Github, Film, Gamepad2, Music, Radio, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs uppercase font-semibold tracking-widest text-blue-400 font-mono">
          Brand Heritage & Mission
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight [text-wrap:balance]">
          Cinema-Grade Creation for the Digital Age
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {siteConfig.brand.name} is an independent creator and digital entertainment media brand dedicated to high-tension storytelling, competitive gaming analyses, and original audiovisual projects.
        </p>
      </div>

      {/* Brand Story Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#080b16] border border-white/[0.08] space-y-6">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">
          The Origin & Creative Philosophy
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            In an era dominated by disposable 15-second viral clips, <strong>NASCORE STUDIO</strong> was founded on a singular conviction: online media can be as immersive, meticulously researched, and visually arresting as high-end cinema.
          </p>
          <p>
            Whether dissecting a high-stakes competitive esports match, unraveling forgotten internet archives, or scoring original synthesizer soundscapes, every frame is treated with obsession. We combine investigative rigor with tactical commentary to produce work that respects our viewers' intellect and time.
          </p>
          <p>
            We operate fully independently, funded purely through audience support, direct viewership, and community passion.
          </p>
        </div>
      </div>

      {/* What We Create - 4 Pillars */}
      <div>
        <div className="text-center mb-10">
          <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
            Core Disciplines
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Our Production Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Tactical Gaming & Analysis
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Frame-by-frame breakdowns of elite game sense, map control, crosshair placement, clutch psychology, and competitive esports dynamics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Investigative Documentaries
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Exhaustively researched video essays documenting platform controversies, internet media archaeology, algorithm shifts, and creator culture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Original Music & Sound Design
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Bespoke dark synthwave compositions, custom foley textures, and cinematic tension cues engineered in our studio.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Direct Community Dispatches
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Free, serverless, and algorithmic-free announcements, casting calls, and production timeline updates via our GitHub system.
            </p>
          </div>
        </div>
      </div>

      {/* Production Standards & Ethics */}
      <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#070912] flex flex-col md:flex-row items-start gap-6">
        <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-display mb-2">
            Commitment to Truth & Verification
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All documentary reporting, YouTuber exposure stories, and investigative pieces produced by NASCORE STUDIO adhere to rigorous factual verification. We do not engage in fabricated drama, ungrounded speculation, or clickbait deception. Our goal is clarity, depth, and context.
          </p>
        </div>
      </div>

      {/* Official Contact & Social Channels */}
      <div className="border-t border-white/[0.08] pt-12">
        <div className="text-center mb-8">
          <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
            Connect & Collaborate
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Official Social & Business Channels
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            For sponsorships, collaboration inquiries, or press inquiries, reach out through our official verified touchpoints below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* YouTube */}
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl border border-white/[0.08] bg-[#090b14] hover:border-red-500/50 hover:bg-red-950/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center mb-3">
                <Youtube className="w-5 h-5 fill-current" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                YouTube Channel
              </div>
              <div className="text-xs text-slate-400 mt-1">{siteConfig.youtube.channelHandle}</div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-red-400 font-medium">
              <span>Visit Channel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl border border-white/[0.08] bg-[#090b14] hover:border-pink-500/50 hover:bg-pink-950/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-pink-600/20 text-pink-500 flex items-center justify-center mb-3">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                Instagram
              </div>
              <div className="text-xs text-slate-400 mt-1">@nascorestudio</div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-pink-400 font-medium">
              <span>Follow Visuals</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Discord */}
          {siteConfig.social.discord && (
            <a
              href={siteConfig.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl border border-white/[0.08] bg-[#090b14] hover:border-indigo-500/50 hover:bg-indigo-950/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Discord Community
                </div>
                <div className="text-xs text-slate-400 mt-1">Lobbies & Discussion</div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-indigo-400 font-medium">
                <span>Join Server</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          )}

          {/* Email */}
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="group p-5 rounded-xl border border-white/[0.08] bg-[#090b14] hover:border-blue-500/50 hover:bg-blue-950/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                Direct Inquiries
              </div>
              <div className="text-xs text-slate-400 mt-1">{siteConfig.social.email}</div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-blue-400 font-medium">
              <span>Send Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
