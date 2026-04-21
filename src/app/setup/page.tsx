import { Terminal, TLine, TBlank } from '@/components/Terminal';
import Callout from '@/components/Callout';
import LessonNav from '@/components/LessonNav';

const CLAUDE_MD_TEMPLATE = `# fincen-fe

## Quick Commands
- \`npm run dev\` — Start dev server (http://localhost:3000)
- \`npm run build\` — Production build
- \`npm run lint\` — Run ESLint
- \`npm test\` — Run Jest tests

## Tech Stack
- **Framework**: Next.js 14 + App Router
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + tailwind-merge + clsx
- **UI Components**: @bsim/* (internal design system)
- **Forms**: Formik + Yup (client-side) + Zod (API response parsing)
- **HTTP**: Axios via src/repositories/globalFetcher.ts
- **Data Fetching**: SWR hooks
- **State**: React Context API (src/context/globalContext.tsx)
- **Export**: xlsx library (already installed)
- **Testing**: Jest + React Testing Library

## Directory Structure
- src/app/(dashboard)/   — Protected routes
- src/app/(auth)/        — Login / auth routes
- src/app/(apis)/        — API proxy routes (Next.js API)
- src/components/        — Shared UI components
- src/repositories/      — API layer, one folder per domain
- src/context/           — React Context providers
- src/schemas/           — Zod / Yup validation schemas
- src/types/             — TypeScript interfaces & types
- src/api-mock/          — Mock data for tests

## Key Patterns
- API calls: Use globalFetcher.ts with typed generics
  e.g. globalFetcher.get<ApiResponse<Report[]>>('/reports')
- Components: Always prefer @bsim/* before writing custom
- Forms: Formik for state, Yup for validation schema
- Export: Follow pattern in src/repositories/audit-trail/export.ts
- Encryption: crypto-js used for sensitive data in globalContext.tsx

## Do Not
- Duplicate auth logic — it lives in middleware.ts
- Import directly from @bsim/* — use the re-exports in src/components/ui/
- Remove Elastic APM or Sentry — they are required by DevOps`;

export default function SetupPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-blue uppercase tracking-wider mb-3">
          Module 01
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #fff 40%, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Setup & /init
        </h1>
        <p className="text-[--text-muted] text-base">
          The 5-minute setup that pays off every session.
        </p>
      </div>

      {/* Installation */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-8 mb-4">1. Install Claude Code</h2>
      <Terminal title="bash">
        <pre>
          <TLine><span className="t-comment"># Install globally (one time per machine)</span></TLine>
          <TLine><span className="t-prompt">$</span> <span className="t-cmd">npm install -g @anthropic-ai/claude-code</span></TLine>
          <TBlank />
          <TLine><span className="t-comment"># Verify install</span></TLine>
          <TLine><span className="t-prompt">$</span> <span className="t-cmd">claude --version</span></TLine>
          <TLine><span className="t-success">✓ Claude Code 1.x.x</span></TLine>
        </pre>
      </Terminal>

      <Callout variant="tip" title="API Key Setup">
        On first run, Claude Code will prompt you for your Anthropic API key. Contact your team lead for the Bank Sinarmas shared key, or use your personal key from <code>console.anthropic.com</code>.
      </Callout>

      {/* Opening a project */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">2. Open Your Project</h2>
      <Terminal title="bash — opening rap-fe">
        <pre>
          <TLine><span className="t-prompt">$</span> <span className="t-cmd">cd C:\Projects\rap-fe</span></TLine>
          <TLine><span className="t-prompt">$</span> <span className="t-cmd">claude</span></TLine>
          <TBlank />
          <TLine><span className="t-claude">╔════════════════════════════════════╗</span></TLine>
          <TLine><span className="t-claude">║  Claude Code  ·  Sonnet 4.6        ║</span></TLine>
          <TLine><span className="t-claude">╚════════════════════════════════════╝</span></TLine>
          <TLine><span className="t-output">Working directory: C:\Projects\rap-fe</span></TLine>
          <TLine><span className="t-output">No CLAUDE.md found. Run /init to get started.</span></TLine>
          <TBlank />
          <TLine><span className="t-user">&gt; </span><span className="cursor" /></TLine>
        </pre>
      </Terminal>

      <Callout variant="warning" title="Always open from the project root">
        Claude Code scopes its understanding to the folder you open it from. Opening from <code>C:\Projects</code> instead of <code>C:\Projects\fincen-fe</code> means Claude sees everything — wasting tokens and giving vague answers.
      </Callout>

      {/* /init */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">3. The Most Important Command: <code>/init</code></h2>
      <p className="text-[--text-secondary] text-sm mb-4">
        <code>/init</code> reads your entire project structure and generates a <strong>CLAUDE.md</strong> — a permanent context file that Claude reads at the start of every session. This is the single highest-ROI action you can take.
      </p>

      <Terminal title="bash — running /init in cmos-fe">
        <pre>
          <TLine><span className="t-user">&gt;</span> <span className="t-cmd">/init</span></TLine>
          <TBlank />
          <TLine><span className="t-claude">Claude:</span> <span className="t-output">Analyzing codebase...</span></TLine>
          <TLine><span className="t-output">  Reading package.json...</span></TLine>
          <TLine><span className="t-output">  Scanning src/ structure...</span></TLine>
          <TLine><span className="t-output">  Detecting patterns in repositories/...</span></TLine>
          <TLine><span className="t-output">  Found @bsim design system usage</span></TLine>
          <TLine><span className="t-output">  Found globalFetcher.ts pattern</span></TLine>
          <TLine><span className="t-output">  Found CKEditor5 integration</span></TLine>
          <TBlank />
          <TLine><span className="t-success">✓ Created CLAUDE.md (347 tokens saved per session)</span></TLine>
        </pre>
      </Terminal>

      <div className="grid grid-cols-3 gap-4 my-6">
        {[
          { icon: '🗂️', title: 'Without CLAUDE.md', desc: 'You re-explain the stack every session. ~500–1000 tokens wasted.' },
          { icon: '📄', title: 'With CLAUDE.md', desc: 'Claude already knows your stack, patterns, and constraints from message 1.' },
          { icon: '⚡', title: 'ROI', desc: 'One /init → saves hundreds of tokens across every future session.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-bg-card border border-border rounded-xl p-4">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm font-bold text-[--text-primary] mb-1">{title}</div>
            <div className="text-xs text-[--text-secondary] leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      {/* CLAUDE.md template */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-3">4. Customize Your CLAUDE.md</h2>
      <p className="text-[--text-secondary] text-sm mb-4">
        After <code>/init</code>, open CLAUDE.md and add project-specific details /init might miss. Here's a production-ready template for Bank Sinarmas Next.js projects:
      </p>

      <div className="terminal my-4">
        <div className="terminal-header">
          <div className="flex gap-1.5"><div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/></div>
          <span className="text-xs text-[--text-muted] ml-2">CLAUDE.md — fincen-fe</span>
        </div>
        <div className="terminal-body">
          <pre className="text-[12px] text-[--text-secondary] whitespace-pre-wrap">{CLAUDE_MD_TEMPLATE}</pre>
        </div>
      </div>

      <Callout variant="success" title="i-iam-dashboard already has a great CLAUDE.md">
        Out of all six projects, only <strong>i-iam-dashboard</strong> has a CLAUDE.md. Use it as inspiration — then apply the same pattern to atmr-fe, cmos-fe, fincen-fe, i-iam-fe, and rap-fe.
      </Callout>

      {/* Key configuration */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">5. Keyboard Shortcuts</h2>
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        {[
          { keys: ['Shift', 'Tab'], desc: 'Switch between Sonnet / Opus mid-session' },
          { keys: ['/compact'],       desc: 'Compress context when it gets large (saves tokens)' },
          { keys: ['/review'],        desc: 'Review current changes before committing' },
          { keys: ['/clear'],         desc: 'Start a fresh context (new feature = new session)' },
          { keys: ['Esc'],            desc: 'Cancel current Claude response' },
          { keys: ['↑'],              desc: 'Recall previous prompt' },
        ].map(({ keys, desc }, i) => (
          <div key={i} className={`flex items-center gap-4 px-5 py-3 ${i < 5 ? 'border-b border-border' : ''}`}>
            <div className="flex gap-1.5 min-w-[130px]">
              {keys.map(k => (
                <kbd key={k} className="inline-flex items-center bg-bg-card border border-border-light border-b-2 rounded px-2 py-0.5 font-mono text-xs font-semibold text-[--text-primary]">
                  {k}
                </kbd>
              ))}
            </div>
            <span className="text-sm text-[--text-secondary]">{desc}</span>
          </div>
        ))}
      </div>

      <LessonNav
        prev={{ href: '/', label: 'Home' }}
        next={{ href: '/prompting', label: 'Prompting Mastery' }}
      />
    </div>
  );
}
