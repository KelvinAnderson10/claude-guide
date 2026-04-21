import { Terminal, TLine, TBlank } from '@/components/Terminal';
import Callout from '@/components/Callout';
import LessonNav from '@/components/LessonNav';

const TOKEN_COSTS = [
  { label: 'Your opening message', tokens: 120,  pct: 6,   color: '#3b82f6' },
  { label: 'CLAUDE.md (saved context)', tokens: 350,  pct: 17,  color: '#a855f7' },
  { label: 'globalFetcher.ts (Claude read)', tokens: 280,  pct: 14,  color: '#f97316' },
  { label: '3 repository files read', tokens: 620,  pct: 31,  color: '#f97316' },
  { label: 'Claude response (code)', tokens: 480,  pct: 24,  color: '#22c55e' },
  { label: 'Your follow-up question', tokens: 80,   pct: 4,   color: '#3b82f6' },
  { label: 'Growing conversation history', tokens: 850, pct: 42,  color: '#ef4444', warn: true },
];

export default function TokensPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-yellow uppercase tracking-wider mb-3">Module 03</div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #fff 40%, #eab308)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Token Economy
        </h1>
        <p className="text-[--text-muted] text-base">Every token costs money. These habits keep sessions fast, cheap, and high-quality.</p>
      </div>

      {/* What are tokens */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-8 mb-4">What Are Tokens?</h2>
      <p className="text-[--text-secondary] text-sm mb-4">
        Tokens are the unit of text Claude processes. Roughly <strong className="text-[--text-primary]">1 token ≈ 4 characters</strong>. Every file Claude reads, every message you send, and every response it writes counts toward the context window — and costs money.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: '📄', label: 'A typical Next.js page (page.tsx)', tokens: '~200–400 tokens' },
          { icon: '🗂️', label: 'Your entire CLAUDE.md', tokens: '~350 tokens' },
          { icon: '💬', label: 'One good prompt', tokens: '~80–150 tokens' },
        ].map(({ icon, label, tokens }) => (
          <div key={label} className="bg-bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-[11px] text-[--text-muted] mb-1">{label}</div>
            <div className="text-sm font-bold font-mono text-accent-yellow">{tokens}</div>
          </div>
        ))}
      </div>

      {/* Context window visual */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Where Your Tokens Go in One Session</h2>
      <div className="bg-bg-terminal border border-border rounded-xl p-5">
        <div className="text-xs text-[--text-muted] uppercase tracking-wider font-bold mb-4">Session context breakdown (200k window)</div>
        {TOKEN_COSTS.map(({ label, tokens, pct, color, warn }) => (
          <div key={label} className={`flex items-center gap-3 mb-3 ${warn ? 'opacity-90' : ''}`}>
            <div className="text-[12px] text-[--text-secondary] w-52 flex-shrink-0">{label}</div>
            <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className={`text-[11px] font-mono w-20 text-right ${warn ? 'text-accent-red font-bold' : 'text-[--text-muted]'}`}>
              ~{tokens.toLocaleString()} {warn ? '⚠️' : ''}
            </div>
          </div>
        ))}
      </div>

      <Callout variant="danger" title="Conversation history is the #1 token drain">
        Every message you send includes the <em>entire conversation history</em> as context. A 20-message session passes the full history on every single call. That's why long sessions feel slower and give worse answers.
      </Callout>

      {/* /compact */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">The Fix: <code>/compact</code></h2>
      <p className="text-[--text-secondary] text-sm mb-4">
        When your session gets long, <code>/compact</code> compresses the conversation history into a tight summary — keeping what matters, dropping the noise.
      </p>

      <Terminal title="bash — using /compact">
        <pre>
          <TLine><span className="t-comment"># You've been in a session for 30 minutes...</span></TLine>
          <TLine><span className="t-comment"># Context indicator shows 78% full</span></TLine>
          <TBlank />
          <TLine><span className="t-user">&gt;</span> <span className="t-cmd">/compact</span></TLine>
          <TBlank />
          <TLine><span className="t-claude">Claude:</span> <span className="t-output">Compressing conversation history...</span></TLine>
          <TLine><span className="t-output">  Preserved: decisions, generated code, key constraints</span></TLine>
          <TLine><span className="t-output">  Dropped: exploratory back-and-forth, repeated context</span></TLine>
          <TLine><span className="t-success">✓ Context reduced from 78% → 22% (saved ~56,000 tokens)</span></TLine>
          <TBlank />
          <TLine><span className="t-comment"># Continue working normally</span></TLine>
          <TLine><span className="t-user">&gt;</span> <span className="t-cmd">Now add error handling to the export function...</span></TLine>
        </pre>
      </Terminal>

      {/* Session hygiene */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Session Hygiene Rules</h2>
      <div className="steps">
        {[
          {
            title: '1 ticket = 1 session',
            desc: 'Start a fresh Claude session for each Jira ticket. Don\'t carry over context from yesterday\'s feature. Use /clear or just open a new terminal.',
          },
          {
            title: 'Run /compact at 60–70% context',
            desc: 'Don\'t wait until you\'re at 95%. Compact early so Claude retains the important context, not just the most recent messages.',
          },
          {
            title: 'CLAUDE.md eliminates warm-up tokens',
            desc: 'Without CLAUDE.md, your first message in every session costs 300–500 tokens re-explaining your stack. CLAUDE.md makes message 1 immediately useful.',
          },
          {
            title: 'Don\'t paste entire files',
            desc: 'Instead of pasting a 400-line component, say "look at src/components/ReportTable.tsx". Claude Code can read files directly — pasting wastes tokens.',
          },
          {
            title: 'Use file references, not content',
            desc: 'Tell Claude "follow the pattern in X" rather than copying the pattern into your prompt. One sentence beats 50 lines of pasted code.',
          },
        ].map(({ title, desc }, i) => (
          <div key={i} className="step">
            <div className="step-num" />
            {i < 4 && <div className="step-line" />}
            <div className="step-content">
              <div className="text-sm font-bold text-[--text-primary] mb-1">{title}</div>
              <div className="text-sm text-[--text-secondary]">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CLAUDE.md ROI */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">CLAUDE.md: The Best Token Investment</h2>
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-5 border-r border-border">
            <div className="text-xs font-bold text-accent-red uppercase tracking-wider mb-3">Without CLAUDE.md</div>
            <div className="font-mono text-xs text-[--text-secondary] space-y-1">
              <div>Session 1: "We use Next.js 14 + TypeScript..."</div>
              <div>Session 2: "We use @bsim components..."</div>
              <div>Session 3: "API calls go through globalFetcher..."</div>
              <div>Session 4: "Our repo structure is..."</div>
              <div className="text-accent-red font-bold mt-2">= 400–800 tokens wasted per session</div>
            </div>
          </div>
          <div className="p-5">
            <div className="text-xs font-bold text-accent-green uppercase tracking-wider mb-3">With CLAUDE.md</div>
            <div className="font-mono text-xs text-[--text-secondary] space-y-1">
              <div>Session 1: "Add export to GL page"</div>
              <div>Session 2: "Fix the date filter bug"</div>
              <div>Session 3: "Write tests for users repo"</div>
              <div>Session 4: "Add Zod schema for form"</div>
              <div className="text-accent-green font-bold mt-2">= Immediate, accurate code</div>
            </div>
          </div>
        </div>
      </div>

      <LessonNav
        prev={{ href: '/prompting', label: 'Prompting Mastery' }}
        next={{ href: '/models', label: 'Sonnet vs Opus' }}
      />
    </div>
  );
}
