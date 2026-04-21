import { Terminal, TLine, TBlank } from '@/components/Terminal';
import Callout from '@/components/Callout';
import LessonNav from '@/components/LessonNav';

function SkillCard({ command, badge, desc, when, example, children }: {
  command: string; badge?: string; desc: string; when: string; example?: string; children?: React.ReactNode;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5 mb-5 hover:border-border-light transition-all hover:translate-x-1 duration-150">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-base font-extrabold text-accent-orange bg-orange-500/10 border border-orange-500/25 px-3 py-1 rounded-lg">
          {command}
        </span>
        {badge && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-accent-blue border border-blue-500/25">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-[--text-secondary] mb-3 leading-relaxed">{desc}</p>
      <div className="text-xs text-[--text-muted] mb-3">
        <span className="font-bold text-[--text-secondary]">When: </span>{when}
      </div>
      {example && (
        <div className="bg-bg-terminal border border-border rounded-lg px-4 py-3 font-mono text-[12px] text-[--text-secondary] whitespace-pre-wrap">
          {example}
        </div>
      )}
      {children}
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-green uppercase tracking-wider mb-3">Module 05</div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #fff 40%, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Skills & Commands
        </h1>
        <p className="text-[--text-muted] text-base">Every slash command and skill, with Bank Sinarmas-specific examples.</p>
      </div>

      {/* Slash Commands */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-8 mb-5">Slash Commands</h2>

      <SkillCard
        command="/init"
        badge="Do this first"
        desc="Analyzes your project and generates CLAUDE.md — the project context file that Claude reads at the start of every session. The single highest-ROI command."
        when="First thing when opening any Bank Sinarmas project for the first time."
        example={`> /init

Claude: Analyzing fincen-fe...
✓ Detected: Next.js 14, TypeScript, Tailwind CSS
✓ Detected: @bsim/* design system usage
✓ Detected: Formik + Yup + Zod pattern
✓ Detected: globalFetcher.ts with interceptors
✓ Created CLAUDE.md`}
      />

      <SkillCard
        command="/review"
        desc="Reviews all files you've changed in the current session against best practices for your stack. Catches TypeScript errors, missing error handling, and code style issues."
        when="Before every git commit. Treat it like a mandatory pre-commit check."
        example={`> /review

Claude: Reviewing changes in 3 files...

src/repositories/general-ledger/export.ts
  ⚠ Line 24: No null check before data.items.map()
  ⚠ Line 41: Missing try/catch around xlsx.writeFile()

src/app/(dashboard)/general-ledger/page.tsx
  ✓ @bsim/button props are correct
  ✓ isLoading passed correctly as disabled prop

Recommendation: Fix the 2 warnings before committing.`}
      />

      <SkillCard
        command="/security-review"
        badge="Critical for auth/crypto"
        desc="Performs a security-focused code review: checks for exposed secrets, unsafe crypto usage, XSS vectors, insecure API calls, and auth bypasses."
        when="Any time you modify: middleware.ts, auth context, crypto-js usage (fincen-fe), API proxy routes, or user permission logic (i-iam-fe / i-iam-dashboard)."
        example={`> /security-review

Claude: Security review of modified files...

src/context/globalContext.tsx
  🔴 CRITICAL: crypto-js AES key is hardcoded string
     → Move to environment variable NEXT_PUBLIC_CIPHER_KEY

src/app/(apis)/[...paths]/route.ts
  ⚠ WARNING: No rate limiting on proxy endpoint
  ⚠ Consider: Add request validation middleware

src/repositories/globalFetcher.ts
  ✓ Authorization header uses httpOnly cookie
  ✓ Token refresh logic is safe`}
      />

      <SkillCard
        command="/simplify"
        desc="Reviews your newly written code for over-engineering. Suggests removing unnecessary abstractions, redundant state, and premature optimizations."
        when="After you've gotten your feature working but before /review. 'Make it work, make it right, then make it simple.'"
        example={`> /simplify

Claude: Reviewing export.ts for complexity...

Line 15-28: The buildRows() function wraps a single .map()
  → Replace with inline .map() — no abstraction needed

Line 45: formatCurrency uses a switch with 3 cases for 'IDR'
  → Replace with Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })`}
      />

      <SkillCard
        command="/compact"
        desc="Compresses the current conversation history into a dense summary, freeing up context window space while preserving the important decisions and code."
        when="When context indicator reaches 60–70%. Don't wait until 95%."
      />

      {/* Skills */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-5">Skills</h2>
      <p className="text-sm text-[--text-secondary] mb-5">
        Skills are richer, task-specific modes invoked with <code>/skill-name</code>.
      </p>

      <SkillCard
        command="claude-api"
        badge="For AI features"
        desc="Specialized mode for building features that call the Anthropic Claude API. Handles prompt caching, tool use, streaming, and SDK usage correctly."
        when="If Bank Sinarmas adds AI-powered features to any frontend (e.g. an AI chatbot, document summarizer, or automated report analysis)."
        example={`> /claude-api

# Then describe your feature:
"Add a document summarizer endpoint in cmos-fe that
calls Claude API with prompt caching for the compliance
template context (it's the same for all documents)"`}
      />

      <SkillCard
        command="update-config"
        desc="Modifies Claude Code's settings.json to add hooks, permissions, environment variables, or automated behaviors. Cannot be replicated with memory or preferences alone."
        when="Automating repetitive actions: run lint after every code change, show test output before Claude responds, pre-approve specific bash commands."
        example={`> /update-config

# Example: auto-run ESLint after every edit
"After you edit any TypeScript file in fincen-fe,
automatically run npm run lint and show me the output"

# Example: allow npm commands without prompting
"Add permission to run npm commands without asking"`}
      />

      <SkillCard
        command="fewer-permission-prompts"
        desc="Scans your transcript for commonly approved read-only operations and adds them to the project allowlist — so you're not clicking 'Allow' for the same thing every session."
        when="After your first 2–3 sessions with a project. You'll notice Claude asks permission for the same file reads repeatedly."
        example={`> /fewer-permission-prompts

Claude: Analyzing your last 3 sessions...
Adding to .claude/settings.json allowlist:
  ✓ Bash: git status, git diff, git log
  ✓ Read: src/**, package.json, next.config.ts
  ✓ Bash: npm run lint (read-only analysis)

These won't prompt for permission going forward.`}
      />

      <SkillCard
        command="init (skill)"
        desc="Creates a comprehensive CLAUDE.md for projects that don't have one. More thorough than the /init command — asks clarifying questions about your patterns."
        when="When /init alone doesn't capture enough project-specific detail."
      />

      {/* Cheatsheet */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Quick Reference Cheatsheet</h2>
      <div className="bg-bg-terminal border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-xs text-[--text-muted] font-bold uppercase tracking-wider">When to use what</span>
        </div>
        {[
          { trigger: 'Opening any project for the first time', action: '/init' },
          { trigger: 'Before every git commit',                action: '/review' },
          { trigger: 'Changing auth / crypto / middleware',    action: '/security-review' },
          { trigger: 'Feature works, needs cleanup',           action: '/simplify' },
          { trigger: 'Session context > 65% full',             action: '/compact' },
          { trigger: 'Need complex reasoning / stuck',         action: 'Shift+Tab → Opus' },
          { trigger: 'New feature (clean start)',              action: '/clear (new session)' },
          { trigger: 'Same bash prompts every session',        action: '/fewer-permission-prompts' },
          { trigger: 'Building AI-powered feature',            action: '/claude-api' },
        ].map(({ trigger, action }, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-2.5 border-b border-border last:border-0">
            <div className="text-sm text-[--text-secondary] flex-1">{trigger}</div>
            <div className="font-mono text-[12px] text-accent-orange font-bold bg-orange-500/10 px-2.5 py-0.5 rounded">{action}</div>
          </div>
        ))}
      </div>

      <Callout variant="success" title="Build the muscle memory">
        The engineers getting the most from Claude Code have these on autopilot: <strong>/init</strong> on first open, <strong>/review</strong> before every commit, <strong>/compact</strong> when context grows. That's it.
      </Callout>

      <LessonNav
        prev={{ href: '/models', label: 'Sonnet vs Opus' }}
        next={{ href: '/scenario', label: 'Live Scenario' }}
      />
    </div>
  );
}
