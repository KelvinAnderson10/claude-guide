import Link from 'next/link';

const MODULES = [
  {
    href: '/setup',
    icon: '⚡',
    num: '01',
    title: 'Setup & /init',
    desc: 'Install Claude Code, generate CLAUDE.md, and configure your project for maximum effectiveness.',
    tags: ['Setup', '/init', 'CLAUDE.md'],
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'hover:border-blue-500/50',
  },
  {
    href: '/prompting',
    icon: '✍️',
    num: '02',
    title: 'Prompting Mastery',
    desc: 'Write prompts that get results on the first try. Real examples using your Next.js + @bsim stack.',
    tags: ['Context', 'Atomic', 'Examples'],
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'hover:border-purple-500/50',
  },
  {
    href: '/tokens',
    icon: '🪙',
    num: '03',
    title: 'Token Economy',
    desc: 'Stop wasting tokens. Learn /compact, session hygiene, and how CLAUDE.md pays for itself.',
    tags: ['/compact', 'Sessions', 'Cost'],
    color: 'from-yellow-500/20 to-yellow-500/5',
    border: 'hover:border-yellow-500/50',
  },
  {
    href: '/models',
    icon: '🧠',
    num: '04',
    title: 'Sonnet vs Opus',
    desc: 'Default to Sonnet 4.6 for 90% of tasks. Learn exactly when to upgrade to Opus 4.7.',
    tags: ['Sonnet', 'Opus', 'Decision'],
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'hover:border-cyan-500/50',
  },
  {
    href: '/skills',
    icon: '🛠️',
    num: '05',
    title: 'Skills & Commands',
    desc: 'Master /review, /security-review, /simplify, and every skill with Bank Sinarmas-specific examples.',
    tags: ['/review', '/security-review', 'Skills'],
    color: 'from-green-500/20 to-green-500/5',
    border: 'hover:border-green-500/50',
  },
  {
    href: '/scenario',
    icon: '🎯',
    num: '★',
    title: 'Live Scenario',
    desc: 'Follow Ahmad through a real ticket — from /init to merged PR. Interactive, choose-your-path.',
    tags: ['Interactive', 'Full Workflow', 'Story'],
    color: 'from-orange-500/25 to-orange-500/5',
    border: 'hover:border-orange-500/60',
    highlight: true,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-12 py-20 text-center overflow-hidden border-b border-border"
               style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.05) 0%, transparent 100%)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
             style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-accent-orange border border-orange-500/25 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
            🏦 Bank Sinarmas Engineering
          </div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight"
              style={{ background: 'linear-gradient(135deg, #fff 0%, #3b82f6 60%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master Claude Code
          </h1>
          <p className="text-lg text-[--text-secondary] max-w-xl mx-auto mb-8 leading-relaxed">
            The definitive internal guide for using Claude Code effectively on&nbsp;
            <strong className="text-[--text-primary]">atmr-fe, cmos-fe, fincen-fe, i-iam-fe, rap-fe</strong> and more.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/scenario" className="inline-flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-xl font-bold text-sm no-underline hover:bg-orange-600 transition-all hover:-translate-y-0.5">
              🎯 Start Interactive Scenario
            </Link>
            <Link href="/setup" className="inline-flex items-center gap-2 border border-border-light text-[--text-primary] px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:border-accent-blue hover:bg-blue-500/5 transition-all">
              ⚡ Quick Setup →
            </Link>
          </div>
        </div>
      </section>

      {/* Stack overview */}
      <section className="px-12 py-8 border-b border-border bg-bg-secondary/40">
        <p className="text-xs text-[--text-muted] uppercase tracking-widest mb-3 font-bold">Your stack — all examples use these</p>
        <div className="flex flex-wrap gap-2">
          {['Next.js 14', 'TypeScript', 'Tailwind CSS', '@bsim/*', 'Formik + Yup', 'Zod', 'Axios + SWR', 'Jest + RTL', 'Zustand', 'Sentry', 'Elastic APM'].map(t => (
            <span key={t} className="text-[12px] px-3 py-1 rounded-full bg-border/60 text-[--text-secondary] border border-border font-mono">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Modules grid */}
      <section className="px-12 py-10">
        <h2 className="text-2xl font-bold mb-1 text-[--text-primary]">Learning Modules</h2>
        <p className="text-[--text-muted] text-sm mb-8">Work through them in order, or jump to what you need.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MODULES.map(({ href, icon, num, title, desc, tags, color, border, highlight }) => (
            <Link
              key={href}
              href={href}
              className={`relative group block p-6 rounded-xl border border-border bg-bg-card no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-bg-card-hover ${border} ${highlight ? 'md:col-span-2 xl:col-span-3' : ''}`}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-xs font-bold text-[--text-muted] font-mono">{num}</span>
                </div>
                <h3 className="text-base font-bold text-[--text-primary] mb-2">{title}</h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => (
                    <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-border/60 text-[--text-muted] border border-border font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                {highlight && (
                  <div className="mt-3 inline-flex items-center gap-2 text-accent-orange text-sm font-bold">
                    Start interactive lesson →
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick win */}
      <section className="px-12 pb-12">
        <div className="bg-bg-card border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6 text-[--text-primary]">⚡ 60-Second Quick Start</h2>
          <div className="terminal">
            <div className="terminal-header">
              <div className="flex gap-1.5"><div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/></div>
              <span className="text-xs text-[--text-muted] ml-2">bash — fincen-fe</span>
            </div>
            <div className="terminal-body">
              <pre>
                <div><span className="t-comment"># 1. Install Claude Code (one time)</span></div>
                <div><span className="t-prompt">$</span> <span className="t-cmd">npm install -g @anthropic-ai/claude-code</span></div>
                <div>&nbsp;</div>
                <div><span className="t-comment"># 2. Open your project</span></div>
                <div><span className="t-prompt">$</span> <span className="t-cmd">cd C:\Projects\fincen-fe</span></div>
                <div><span className="t-prompt">$</span> <span className="t-cmd">claude</span></div>
                <div>&nbsp;</div>
                <div><span className="t-comment"># 3. First thing — document the project</span></div>
                <div><span className="t-user">&gt;</span> <span className="t-cmd">/init</span></div>
                <div>&nbsp;</div>
                <div><span className="t-claude">Claude:</span> <span className="t-output">I'll analyze your codebase and create CLAUDE.md...</span></div>
                <div><span className="t-success">✓ Created CLAUDE.md with Next.js 14, Tailwind, Formik patterns</span></div>
                <div>&nbsp;</div>
                <div><span className="t-comment"># 4. Now start working with context</span></div>
                <div><span className="t-user">&gt;</span> <span className="t-cmd">In fincen-fe, add an export button to src/app/(dashboard)/</span></div>
                <div><span className="t-cmd">     general-ledger/page.tsx using @bsim/button variant=&quot;secondary&quot;</span></div>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
