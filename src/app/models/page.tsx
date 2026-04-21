import { Terminal, TLine, TBlank } from '@/components/Terminal';
import Callout from '@/components/Callout';
import LessonNav from '@/components/LessonNav';

export default function ModelsPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-cyan uppercase tracking-wider mb-3">Module 04</div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #fff 40%, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Sonnet vs Opus
        </h1>
        <p className="text-[--text-muted] text-base">The right model for the right job. Default to Sonnet; upgrade deliberately.</p>
      </div>

      {/* Model cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 mb-8">
        {/* Sonnet */}
        <div className="bg-bg-card rounded-xl p-6 border-2 border-blue-500/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan" />
          <div className="text-3xl font-black text-accent-blue mb-1">Sonnet 4.6</div>
          <div className="text-xs text-[--text-muted] mb-4">Default — use this 90% of the time</div>
          <div className="text-xs font-bold text-[--text-muted] uppercase tracking-wider mb-2">Best for:</div>
          <ul className="space-y-1.5 text-sm text-[--text-secondary]">
            {[
              'Adding components or pages',
              'Writing/fixing repository functions',
              'Creating Zod/Yup schemas',
              'Writing Jest unit tests',
              'Fixing linting/TypeScript errors',
              'Code reviews and /review',
              'Explaining existing code',
              'Updating styles with Tailwind',
            ].map(t => <li key={t} className="flex items-start gap-2"><span className="text-accent-blue mt-0.5">→</span>{t}</li>)}
          </ul>
          <div className="mt-4 pt-4 border-t border-border text-xs text-[--text-muted]">
            Speed: ⚡⚡⚡⚡⚡ &nbsp;|&nbsp; Cost: 💰
          </div>
        </div>

        {/* Opus */}
        <div className="bg-bg-card rounded-xl p-6 border-2 border-orange-500/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-purple" />
          <div className="text-3xl font-black text-accent-orange mb-1">Opus 4.7</div>
          <div className="text-xs text-[--text-muted] mb-4">Upgrade when Sonnet struggles</div>
          <div className="text-xs font-bold text-[--text-muted] uppercase tracking-wider mb-2">Best for:</div>
          <ul className="space-y-1.5 text-sm text-[--text-secondary]">
            {[
              'Multi-file refactors (e.g. Context → Zustand)',
              'Complex auth flow debugging (middleware.ts)',
              'Designing new module architecture',
              'Tricky state management bugs',
              'Performance optimization analysis',
              'Security review of crypto-js usage',
              'When Sonnet gives a wrong answer twice',
              'Understanding unfamiliar legacy code',
            ].map(t => <li key={t} className="flex items-start gap-2"><span className="text-accent-orange mt-0.5">→</span>{t}</li>)}
          </ul>
          <div className="mt-4 pt-4 border-t border-border text-xs text-[--text-muted]">
            Speed: ⚡⚡⚡ &nbsp;|&nbsp; Cost: 💰💰💰
          </div>
        </div>
      </div>

      {/* How to switch */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">How to Switch Models</h2>
      <Terminal title="bash — switching to Opus mid-session">
        <pre>
          <TLine><span className="t-comment"># Method 1: Shift+Tab toggles model in the current session</span></TLine>
          <TLine><span className="t-output">[Press Shift+Tab]</span></TLine>
          <TLine><span className="t-success">✓ Switched to claude-opus-4-7</span></TLine>
          <TBlank />
          <TLine><span className="t-comment"># Method 2: Start a new session with a specific model</span></TLine>
          <TLine><span className="t-prompt">$</span> <span className="t-cmd">claude --model claude-opus-4-7</span></TLine>
          <TBlank />
          <TLine><span className="t-comment"># Method 3: Set default model for the project</span></TLine>
          <TLine><span className="t-comment"># Add to .claude/settings.json:</span></TLine>
          <TLine><span className="t-string">{"{"} "model": "claude-opus-4-7" {"}"}</span></TLine>
        </pre>
      </Terminal>

      {/* Decision tree */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Decision Tree</h2>
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        {[
          { q: 'Is this a standard feature (new page, component, API function)?', a: 'Sonnet', aColor: 'accent-blue' },
          { q: 'Are you debugging a bug you can clearly describe?',              a: 'Sonnet', aColor: 'accent-blue' },
          { q: 'Writing tests or schemas?',                                      a: 'Sonnet', aColor: 'accent-blue' },
          { q: 'Sonnet gave you a wrong answer 2+ times?',                       a: 'Switch to Opus', aColor: 'accent-orange' },
          { q: 'Refactoring that touches 5+ files?',                             a: 'Opus',  aColor: 'accent-orange' },
          { q: 'Debugging a complex state/auth/race condition?',                 a: 'Opus',  aColor: 'accent-orange' },
          { q: 'Designing architecture for a new module?',                       a: 'Opus',  aColor: 'accent-orange' },
        ].map(({ q, a, aColor }, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0">
            <div className="flex-1 text-sm text-[--text-secondary]">{q}</div>
            <div className={`text-sm font-bold text-${aColor} whitespace-nowrap`}>→ {a}</div>
          </div>
        ))}
      </div>

      <Callout variant="tip" title="Start every session on Sonnet">
        Don't open with Opus by default. Sonnet handles 90% of tasks and responds faster. Switch to Opus only when you hit a wall — then switch back when it's resolved.
      </Callout>

      {/* Real scenarios */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Real Examples from Your Projects</h2>
      <div className="space-y-4">
        {[
          {
            model: 'Sonnet',
            color: 'blue',
            scenario: 'Adding @bsim/table to the RAP recovery plan page with SWR data and pagination',
            why: 'Clear, scoped task. Sonnet knows Next.js + Tailwind patterns perfectly.',
          },
          {
            model: 'Sonnet',
            color: 'blue',
            scenario: 'Writing Zod schema for the CMOS compliance form with 8 fields',
            why: 'Schema writing is pattern-matching — Sonnet excels here.',
          },
          {
            model: 'Opus',
            color: 'orange',
            scenario: 'Debugging why fincen-fe\'s auth context loses state on page refresh',
            why: 'Involves middleware.ts, context providers, cookie handling, and Next.js hydration — multi-layer complexity.',
          },
          {
            model: 'Opus',
            color: 'orange',
            scenario: 'Migrating 4 projects from React Context to Zustand with backward compatibility',
            why: 'Multi-file architectural change requiring deep reasoning about state dependencies.',
          },
        ].map(({ model, color, scenario, why }) => (
          <div key={scenario} className={`bg-bg-card border rounded-xl p-4 border-${color === 'blue' ? 'blue' : 'orange'}-500/25`}>
            <div className="flex items-start gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${color === 'blue' ? 'bg-blue-500/15 text-accent-blue' : 'bg-orange-500/15 text-accent-orange'}`}>
                {model}
              </span>
              <div>
                <div className="text-sm text-[--text-primary] font-medium mb-1">{scenario}</div>
                <div className="text-xs text-[--text-muted]">Why: {why}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LessonNav
        prev={{ href: '/tokens', label: 'Token Economy' }}
        next={{ href: '/skills', label: 'Skills & Commands' }}
      />
    </div>
  );
}
