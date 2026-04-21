'use client';

import { useState } from 'react';

interface Choice {
  text: string;
  correct: boolean;
  feedbackTitle: string;
  feedback: string;
}

interface Step {
  title: string;
  context: string;
  avatar: string;
  narrative: string;
  extra?: React.ReactNode;
  question: string;
  choices: Choice[];
  tip?: string;
}

// ── STEP DATA ────────────────────────────────────────────
const STEPS: Step[] = [
  {
    title: 'The Ticket',
    context: 'Monday morning, 9:05 AM',
    avatar: '👨‍💻',
    narrative: `Ahmad, a mid-level frontend engineer at Bank Sinarmas, opens his laptop and checks Jira. A new ticket is assigned to him.`,
    extra: (
      <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 my-5 text-sm">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#21262d]">
          <span className="font-mono text-[12px] text-accent-blue bg-blue-500/10 px-2 py-0.5 rounded font-bold">FNCN-847</span>
          <span className="text-[11px] text-accent-green bg-green-500/10 px-2 py-0.5 rounded font-bold">Feature</span>
          <span className="text-[11px] text-accent-orange bg-orange-500/10 px-2 py-0.5 rounded font-bold ml-auto">High Priority</span>
        </div>
        <h4 className="text-[--text-primary] font-bold mb-2 text-sm">Add Transaction Summary Export (Excel) to General Ledger page</h4>
        <p className="text-[--text-secondary] text-xs mb-2">Users need to export the filtered General Ledger report data as an Excel file (.xlsx). Button should appear next to existing filters.</p>
        <p className="text-[--text-secondary] text-xs font-bold">Acceptance criteria:</p>
        <ul className="text-[--text-secondary] text-xs mt-1 space-y-0.5 list-disc ml-4">
          <li>Export button visible in the General Ledger page header</li>
          <li>Exports all filtered rows (not paginated)</li>
          <li>File named <code>general-ledger-YYYY-MM-DD.xlsx</code></li>
          <li>Button disabled during data loading</li>
        </ul>
      </div>
    ),
    question: "Ahmad hasn't touched fincen-fe in 3 weeks. What's his first move?",
    choices: [
      {
        text: 'Clone the latest branch and start coding immediately',
        correct: false,
        feedbackTitle: 'Missing critical setup',
        feedback: 'Jumping in cold means Ahmad will spend 30 minutes re-orienting himself, and Claude won\'t know the project structure or conventions — leading to generic code that doesn\'t match the codebase.',
      },
      {
        text: 'Open the project with Claude Code and run /init first',
        correct: true,
        feedbackTitle: 'Smart start!',
        feedback: '/init reads the entire fincen-fe codebase and creates CLAUDE.md — a project context file that makes every subsequent Claude interaction faster, cheaper, and more accurate. This 2-minute investment pays off across every message in this session.',
      },
      {
        text: 'Ask a senior engineer what the export pattern looks like',
        correct: false,
        feedbackTitle: 'Unnecessary interruption',
        feedback: 'Claude Code can read the existing export patterns in the codebase directly — no need to interrupt a colleague. Save the human consultation for genuinely ambiguous architectural decisions.',
      },
    ],
    tip: 'Run /init at the start of every project, not just when you\'re new. Context changes over time — even if you wrote the code yourself.',
  },
  {
    title: 'First Command',
    context: 'Terminal — fincen-fe',
    avatar: '⚡',
    narrative: `Ahmad navigates to the project folder and opens Claude Code. The terminal greets him with a warning:`,
    extra: (
      <div className="terminal my-4">
        <div className="terminal-header">
          <div className="flex gap-1.5"><div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/></div>
          <span className="text-xs text-[--text-muted] ml-2">bash — fincen-fe</span>
        </div>
        <div className="terminal-body text-sm">
          <pre>
            <div><span className="t-prompt">$</span> <span className="t-cmd">cd C:\Projects\fincen-fe && claude</span></div>
            <div>&nbsp;</div>
            <div><span className="t-claude">╔══════════════════════════════════════╗</span></div>
            <div><span className="t-claude">║  Claude Code  ·  Sonnet 4.6          ║</span></div>
            <div><span className="t-claude">╚══════════════════════════════════════╝</span></div>
            <div><span className="t-output">Working directory: C:\Projects\fincen-fe</span></div>
            <div><span className="t-error">⚠ No CLAUDE.md found in project root.</span></div>
            <div><span className="t-output">  Run /init to document this project.</span></div>
            <div>&nbsp;</div>
            <div><span className="t-user">&gt; </span><span className="cursor" /></div>
          </pre>
        </div>
      </div>
    ),
    question: 'Claude is ready and waiting. What does Ahmad type first?',
    choices: [
      {
        text: 'Type the feature request directly: "Add export button to general ledger page"',
        correct: false,
        feedbackTitle: 'Starting without context',
        feedback: 'Without CLAUDE.md, Claude has to guess your conventions. It might use fetch() instead of globalFetcher.ts, write a plain <button> instead of @bsim/button, or put the export logic in the wrong folder. You\'ll spend 3 messages correcting it.',
      },
      {
        text: 'Type /init to generate CLAUDE.md',
        correct: true,
        feedbackTitle: 'Perfect first move!',
        feedback: '/init analyzes fincen-fe\'s entire codebase — detects the @bsim design system, globalFetcher.ts pattern, repository folder structure, Formik+Yup+Zod conventions, and the existing xlsx export in repositories/audit-trail. Every future message benefits from this context.',
      },
      {
        text: 'Paste the entire package.json into the chat for context',
        correct: false,
        feedbackTitle: 'Token waste',
        feedback: 'Pasting package.json costs ~400 tokens and only tells Claude your dependencies — not your folder structure, naming conventions, or API patterns. /init does far more in a fraction of the tokens.',
      },
    ],
    tip: 'CLAUDE.md is fincen-fe\'s "system prompt". Once created, Claude reads it at the start of every session without you doing anything.',
  },
  {
    title: 'Editing CLAUDE.md',
    context: 'Review the generated file',
    avatar: '📄',
    narrative: `/init runs in about 15 seconds and creates a CLAUDE.md. Ahmad opens it and sees a solid foundation — but notices it missed a few critical fincen-fe specifics.`,
    extra: (
      <div className="terminal my-4">
        <div className="terminal-header">
          <div className="flex gap-1.5"><div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/></div>
          <span className="text-xs text-[--text-muted] ml-2">CLAUDE.md — generated by /init</span>
        </div>
        <div className="terminal-body text-[12px]">
          <pre className="text-[--text-secondary] whitespace-pre-wrap">{`# fincen-fe

## Commands
- \`npm run dev\` — Start dev server
- \`npm run build\` — Build
- \`npm test\` — Run tests

## Tech Stack
- Next.js 14 + App Router
- TypeScript (strict)
- Tailwind CSS
...

# ← Claude missed these critical patterns:
# - crypto-js used for user data encryption
# - How to use globalFetcher.ts with typed generics
# - The existing xlsx export in repositories/audit-trail/
# - @bsim/* components require re-exports from src/components/ui/`}</pre>
        </div>
      </div>
    ),
    question: 'The CLAUDE.md exists but is missing project-specific patterns. What does Ahmad do?',
    choices: [
      {
        text: 'Leave it as-is — it\'s good enough',
        correct: false,
        feedbackTitle: 'Missed opportunity',
        feedback: 'The generic CLAUDE.md is better than nothing, but it won\'t prevent Claude from calling globalFetcher.ts wrong, ignoring the existing xlsx export pattern, or not knowing about the crypto-js encryption requirement. A 5-minute edit here saves 30 minutes of corrections later.',
      },
      {
        text: 'Add the missing patterns: globalFetcher usage, crypto-js note, @bsim import pattern, existing xlsx reference',
        correct: true,
        feedbackTitle: 'Quality investment!',
        feedback: 'Every detail you add to CLAUDE.md is an instruction that applies to every future message in every future session. "Follow the pattern in repositories/audit-trail/export.ts" in CLAUDE.md means Claude generates consistent export code automatically — without you asking.',
      },
    ],
    tip: 'Treat CLAUDE.md as living documentation. Update it when you discover new patterns, add new dependencies, or establish new conventions.',
  },
  {
    title: 'The First Prompt',
    context: 'Time to write the feature',
    avatar: '✍️',
    narrative: `CLAUDE.md is set. Ahmad is ready to ask for the feature. He has two options for how to phrase his request.`,
    extra: (
      <div className="compare-grid my-4">
        <div className="compare-bad">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent-red mb-2.5">Option A — Quick prompt</div>
          <pre>{`Add export to excel button
to the general ledger page`}</pre>
        </div>
        <div className="compare-good">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent-green mb-2.5">Option B — Full prompt</div>
          <pre>{`In fincen-fe, add an "Export Excel" button to
src/app/(dashboard)/general-ledger/page.tsx.

Requirements:
- Use @bsim/button with variant="secondary"
- Export all filtered rows (from SWR "data.items")
- Filename: general-ledger-{YYYY-MM-DD}.xlsx
- Button disabled when SWR "isLoading" is true
- Add export logic to:
  src/repositories/general-ledger/export.ts
- Follow the pattern in:
  src/repositories/audit-trail/export.ts`}</pre>
        </div>
      </div>
    ),
    question: 'Which prompt should Ahmad send?',
    choices: [
      {
        text: 'Option A — Quick and to the point',
        correct: false,
        feedbackTitle: 'Vague = wrong output',
        feedback: 'Claude will generate something, but it won\'t know which button component to use, where to put the file, what the data structure looks like, or which existing pattern to follow. Ahmad will spend 3+ corrections getting to what Option B delivers first-try.',
      },
      {
        text: 'Option B — Full context with file paths and patterns',
        correct: true,
        feedbackTitle: 'First-try accuracy!',
        feedback: 'This prompt gives Claude everything it needs: exact file paths, the component to use, the data structure, the existing pattern to follow, and the constraints. Claude will generate code that compiles, matches your conventions, and works on the first attempt.',
      },
    ],
    tip: 'Specificity isn\'t verbose — it\'s efficient. 8 lines of specific prompt = 1 round-trip. 1 vague line = 4 round-trips.',
  },
  {
    title: 'Claude Asks a Question',
    context: 'Back-and-forth exchange',
    avatar: '🤔',
    narrative: `Ahmad sends Option B. Claude acknowledges the request but asks one clarifying question before generating code.`,
    extra: (
      <div className="terminal my-4">
        <div className="terminal-header">
          <div className="flex gap-1.5"><div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/></div>
          <span className="text-xs text-[--text-muted] ml-2">Claude Code — fincen-fe</span>
        </div>
        <div className="terminal-body text-sm">
          <pre>
            <div><span className="t-claude">Claude:</span> <span className="t-output">I'll create the Excel export for the General Ledger page.</span></div>
            <div>&nbsp;</div>
            <div><span className="t-output">Before I generate the code, one question:</span></div>
            <div><span className="t-output">The audit-trail export uses column headers defined in</span></div>
            <div><span className="t-output">a separate COLUMN_MAP constant. For General Ledger,</span></div>
            <div><span className="t-output">should I:</span></div>
            <div>&nbsp;</div>
            <div><span className="t-output">(a) Read the column headers from the existing TanStack</span></div>
            <div><span className="t-output">    table column definitions in page.tsx</span></div>
            <div><span className="t-output">(b) Define a new static COLUMN_MAP in export.ts</span></div>
            <div>&nbsp;</div>
            <div><span className="t-user">&gt;</span><span className="cursor" /></div>
          </pre>
        </div>
      </div>
    ),
    question: 'How should Ahmad answer Claude\'s question?',
    choices: [
      {
        text: '"Just do whatever makes sense"',
        correct: false,
        feedbackTitle: 'Ambiguity causes inconsistency',
        feedback: 'Telling Claude to decide for itself here means the output might not match your codebase conventions. On a team with multiple devs, consistency matters. Take 10 seconds to give a real answer.',
      },
      {
        text: '"Use option (a) — read from the TanStack column defs. The column config is at line 45 in page.tsx, in the variable called `columns`."',
        correct: true,
        feedbackTitle: 'Precise answer, precise output!',
        feedback: 'You pointed Claude to the exact variable. It will generate export code that dynamically reads the column headers — meaning if someone adds/removes columns from the table, the export automatically stays in sync. This is architecturally correct AND reduces future maintenance.',
      },
    ],
    tip: 'When Claude asks a clarifying question, it\'s not stalling — it\'s avoiding a wrong assumption. Specific answers here save regeneration cycles.',
  },
  {
    title: 'Code Generated',
    context: 'Review before applying',
    avatar: '📝',
    narrative: `Claude generates two files: export.ts in the repository and updates to page.tsx. The code looks reasonable to Ahmad at a glance — clean TypeScript, correct imports.`,
    extra: (
      <div className="bg-bg-terminal border border-border rounded-xl p-4 my-4 text-sm">
        <div className="text-[--text-muted] text-xs font-bold uppercase tracking-wider mb-3">Files modified / created</div>
        <div className="space-y-1.5">
          {[
            { file: 'src/repositories/general-ledger/export.ts', status: 'new', desc: '38 lines — buildExcelRows(), exportToExcel()' },
            { file: 'src/app/(dashboard)/general-ledger/page.tsx', status: 'modified', desc: 'Added export button and handler — +12 lines' },
          ].map(({ file, status, desc }) => (
            <div key={file} className="flex items-start gap-2.5">
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${status === 'new' ? 'bg-green-500/15 text-accent-green' : 'bg-blue-500/15 text-accent-blue'}`}>
                {status}
              </span>
              <div>
                <div className="font-mono text-accent-cyan text-[12px]">{file}</div>
                <div className="text-[11px] text-[--text-muted]">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    question: 'The code looks good. What does Ahmad do before running git add?',
    choices: [
      {
        text: 'Run git add and commit — it looks fine',
        correct: false,
        feedbackTitle: 'Never skip code review',
        feedback: 'AI-generated code can have subtle issues: missing null checks, wrong function signatures, edge cases in the xlsx API. "Looks fine" in a 30-second scan is not the same as a thorough review. What you miss now becomes a bug in production.',
      },
      {
        text: 'Run /review to check for issues before committing',
        correct: true,
        feedbackTitle: 'Professional practice!',
        feedback: '/review will catch the kinds of issues Ahmad might miss: a missing null check on data.items before the .map(), a forgotten try/catch around the file write, or an import that works in dev but not production. It takes 30 seconds and has caught real bugs.',
      },
    ],
    tip: '/review is not a sign you don\'t trust Claude. It\'s a sign you\'re a professional engineer who reviews every diff before committing — regardless of who wrote it.',
  },
  {
    title: 'Tests!',
    context: '/review result',
    avatar: '🧪',
    narrative: `/review completes and the functional code looks clean. But it flags one item that Ahmad was hoping to skip.`,
    extra: (
      <div className="terminal my-4">
        <div className="terminal-header">
          <div className="flex gap-1.5"><div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/></div>
          <span className="text-xs text-[--text-muted] ml-2">Claude Code — /review output</span>
        </div>
        <div className="terminal-body text-sm">
          <pre>
            <div><span className="t-claude">Claude:</span> <span className="t-output">Review complete for 2 modified files.</span></div>
            <div>&nbsp;</div>
            <div><span className="t-success">✓ export.ts — TypeScript correct, null safety good</span></div>
            <div><span className="t-success">✓ page.tsx — @bsim/button props correct</span></div>
            <div><span className="t-success">✓ xlsx API usage matches audit-trail pattern</span></div>
            <div>&nbsp;</div>
            <div><span className="t-hl">⚠ No tests found for the new export.ts functions</span></div>
            <div><span className="t-output">  Repository functions should have unit tests.</span></div>
            <div><span className="t-output">  See src/repositories/audit-trail/__tests__/ for pattern.</span></div>
            <div>&nbsp;</div>
            <div><span className="t-output">Recommendation: Add tests before merging.</span></div>
          </pre>
        </div>
      </div>
    ),
    question: 'Ahmad has a deadline. What does he do about the missing tests?',
    choices: [
      {
        text: 'Skip tests — "I\'ll add them later" (we both know later never comes)',
        correct: false,
        feedbackTitle: 'Classic tech debt creation',
        feedback: 'Untested repository functions are a reliability time-bomb. The export function has edge cases: what if data.items is empty? What if the date format changes? Tests catch these. And Claude will write them in under 2 minutes — there\'s no real time cost here.',
      },
      {
        text: 'Ask Claude to write the tests following the audit-trail pattern',
        correct: true,
        feedbackTitle: 'Discipline wins!',
        feedback: 'Ahmad can prompt: "Write Jest tests for src/repositories/general-ledger/export.ts following the pattern in src/repositories/audit-trail/__tests__/export.test.ts" — and Claude will produce a complete test file in 60 seconds. Tests done, deadline intact.',
      },
    ],
    tip: 'Generating tests with Claude is so fast there\'s genuinely no excuse to skip them. The pattern prompt does all the work: "write tests following the pattern in X/__tests__/Y.test.ts".',
  },
  {
    title: 'Context Is Growing',
    context: 'Session health check',
    avatar: '📊',
    narrative: `Ahmad has been working for 40 minutes. He's added the export feature, written tests, and is now adding error toast notifications. The context indicator is showing a warning.`,
    extra: (
      <div className="bg-bg-terminal border border-border rounded-xl p-5 my-4">
        <div className="text-xs text-[--text-muted] font-bold uppercase tracking-wider mb-4">Context Window Status</div>
        <div className="space-y-3">
          {[
            { label: 'CLAUDE.md', pct: 4,  color: '#3b82f6' },
            { label: 'Conversation history (40 min)', pct: 71, color: '#ef4444', warn: true },
            { label: 'Files read this session', pct: 18, color: '#f97316' },
            { label: 'Available',               pct: 7,  color: '#334155' },
          ].map(({ label, pct, color, warn }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`text-[12px] w-52 flex-shrink-0 ${warn ? 'text-accent-red font-bold' : 'text-[--text-secondary]'}`}>{label} {warn ? '⚠️' : ''}</div>
              <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="text-[11px] font-mono text-[--text-muted] w-8 text-right">{pct}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-accent-red font-bold">⚠ Context 93% full — quality will degrade soon</div>
      </div>
    ),
    question: 'Context is at 93% and Ahmad still has work to do. What now?',
    choices: [
      {
        text: 'Keep going — "just a few more messages"',
        correct: false,
        feedbackTitle: 'Degraded output ahead',
        feedback: 'At 93% context, Claude starts losing the earlier parts of the conversation — including the decisions you made and the code patterns you established. The next response quality drops noticeably, and you risk getting code that contradicts what was already built.',
      },
      {
        text: 'Run /compact to compress history before continuing',
        correct: true,
        feedbackTitle: 'Healthy session management!',
        feedback: '/compact compresses the 40 minutes of conversation history into a tight summary — preserving the key decisions (use @bsim/button, follow audit-trail pattern, SWR data structure) while dropping exploratory back-and-forth. Context drops from 93% to ~25%, and Claude continues with full clarity.',
      },
    ],
    tip: 'Run /compact at 60–70%, not 93%. Earlier compression = better summary = less information lost.',
  },
  {
    title: 'A Tricky Bug',
    context: 'Unexpected state issue',
    avatar: '🐛',
    narrative: `After compacting, Ahmad asks Claude to fix a bug: the export button re-renders the entire table on every keystroke in the date filter. Sonnet gives a response, but it's not quite right. Ahmad tries the fix — same problem. He asks again, gets another attempt — still wrong.`,
    extra: (
      <div className="bg-bg-card border border-border-light rounded-xl p-5 my-4">
        <div className="text-xs font-bold text-[--text-muted] uppercase tracking-wider mb-3">What Sonnet said (twice):</div>
        <div className="font-mono text-[12px] text-[--text-secondary] space-y-2">
          <div>Attempt 1: "Wrap the handler in useCallback"</div>
          <div>Attempt 2: "Move the button outside the SWR component"</div>
          <div className="text-accent-red font-bold">Both fixes: ❌ still re-rendering</div>
        </div>
        <div className="mt-3 text-xs text-[--text-muted]">The real issue: Zustand store subscription in a custom hook is causing cascading renders. This requires understanding how Zustand selector equality works with object vs primitive returns.</div>
      </div>
    ),
    question: "Sonnet has failed twice on the same bug. It's a deep state management issue. What should Ahmad do?",
    choices: [
      {
        text: 'Try rephrasing the same question to Sonnet a third time',
        correct: false,
        feedbackTitle: 'Diminishing returns',
        feedback: 'If Sonnet has failed twice on the same problem with different approaches, trying again with the same model will likely produce the same quality of answer. The issue requires deeper multi-step reasoning — exactly what Opus is built for.',
      },
      {
        text: 'Press Shift+Tab to switch to Opus and ask with more context about the Zustand selector issue',
        correct: true,
        feedbackTitle: 'Right tool, right time!',
        feedback: 'Opus 4.7 has stronger multi-step reasoning and a deeper understanding of Zustand v5 selector equality semantics. With the Zustand context added (using primitive vs object return from useStore selector), Opus immediately identifies the root cause and gives a correct fix on the first attempt.',
      },
    ],
    tip: 'The signal to switch to Opus: Sonnet failed the same type of task twice. Don\'t waste 5 more attempts — upgrade for that task, then switch back.',
  },
  {
    title: 'Pre-PR Security Check',
    context: 'Almost done — one last step',
    avatar: '🔐',
    narrative: `The feature works perfectly. Tests pass. Ahmad is about to create the PR when he remembers: fincen-fe uses crypto-js for encrypting user data in the global context. His export code touches the globalContext to get the current user's branch filter. Time to check.`,
    extra: (
      <div className="bg-bg-terminal border border-border rounded-xl p-4 my-4 text-sm">
        <div className="text-[--text-muted] text-xs font-bold uppercase tracking-wider mb-3">What changed in this PR</div>
        <div className="space-y-1.5 text-[12px] font-mono">
          <div><span className="t-file">src/repositories/general-ledger/export.ts</span> <span className="text-accent-green">new</span></div>
          <div><span className="t-file">src/app/(dashboard)/general-ledger/page.tsx</span> <span className="text-accent-blue">modified</span></div>
          <div><span className="t-file">src/repositories/general-ledger/__tests__/export.test.ts</span> <span className="text-accent-green">new</span></div>
          <div>&nbsp;</div>
          <div className="text-[--text-muted]"># export.ts reads from globalContext.user</div>
          <div className="text-[--text-muted]"># globalContext uses crypto-js for user data</div>
        </div>
      </div>
    ),
    question: "Ahmad's code touches encrypted user context. What's the right call before raising the PR?",
    choices: [
      {
        text: 'Create the PR — "I didn\'t touch the crypto logic directly"',
        correct: false,
        feedbackTitle: 'Indirect access is still a vector',
        feedback: 'Even reading from an encrypted context without touching the crypto logic can introduce security issues — like accidentally logging decrypted values, or passing user data to the xlsx file metadata. /security-review catches exactly this kind of indirect exposure.',
      },
      {
        text: 'Run /security-review before raising the PR',
        correct: true,
        feedbackTitle: 'Security-first mindset!',
        feedback: '/security-review will scan for: accidental decrypted data exposure in the xlsx output, any user PII written into file headers or metadata, and whether the branch filter reads safely from the encrypted context. For a financial application handling sensitive GL data, this is not optional.',
      },
    ],
    tip: 'For Bank Sinarmas specifically: any code that touches auth state, crypto-js, user data, or API proxies should go through /security-review. fincen-fe handles financial data — the bar is higher.',
  },
];

// ── COMPONENT ─────────────────────────────────────────────
export default function ScenarioEngine() {
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const step = STEPS[current];
  const totalSteps = STEPS.length;
  const progress = Math.round((current / totalSteps) * 100);
  const isAnswered = chosen !== null;

  function choose(index: number) {
    if (isAnswered) return;
    setChosen(index);
    if (STEPS[current].choices[index].correct) {
      setScore(s => s + 1);
    }
  }

  function next() {
    if (current + 1 >= totalSteps) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setChosen(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function restart() {
    setCurrent(0);
    setChosen(null);
    setScore(0);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (finished) {
    const pct = Math.round((score / totalSteps) * 100);
    return (
      <div className="scene-card animate-in">
        <div className="scene-body text-center py-16">
          <div className="text-7xl mb-5 animate-bounce">🏆</div>
          <h2 className="text-2xl font-extrabold text-accent-green mb-3">Ticket Shipped!</h2>
          <p className="text-[--text-secondary] max-w-md mx-auto mb-6">
            Ahmad successfully delivered the General Ledger export feature using Claude Code best practices.<br />
            <span className="text-accent-orange font-bold text-lg">Score: {score}/{totalSteps} ({pct}%)</span>
          </p>
          <div className="callout callout-success text-left max-w-lg mx-auto mb-6">
            <span className="text-lg">✅</span>
            <div>
              <strong className="block mb-2">Ahmad's full workflow:</strong>
              <ul className="space-y-1 text-sm">
                <li>⚡ /init → CLAUDE.md on first open</li>
                <li>✍️ Context-rich prompts with file paths + patterns</li>
                <li>❓ Answered Claude's clarifying question precisely</li>
                <li>🔍 /review before every commit</li>
                <li>🧪 Tests generated with Claude (60 seconds)</li>
                <li>📊 /compact at 70% context, not 95%</li>
                <li>🧠 Upgraded to Opus for the Zustand bug</li>
                <li>🔐 /security-review before PR</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={restart} className="btn bg-accent-orange text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition-all">
              ↺ Replay Scenario
            </button>
            <a href="/skills" className="btn border border-border-light text-[--text-primary] px-5 py-2.5 rounded-lg font-semibold text-sm hover:border-accent-blue hover:bg-blue-500/5 transition-all no-underline">
              ← Review Skills
            </a>
          </div>
        </div>
      </div>
    );
  }

  const selected = chosen !== null ? step.choices[chosen] : null;

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="font-bold text-accent-orange">Step {current + 1} of {totalSteps}</span>
          <span className="text-[--text-muted]">{progress}% complete · {score} correct</span>
        </div>
        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
               style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #f97316)' }} />
        </div>
      </div>

      {/* Scene card */}
      <div className="scene-card animate-in">
        {/* Header */}
        <div className="scene-header">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #3b82f6, #a855f7)' }}>
            {step.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[--text-primary]">{step.title}</h2>
            <p className="text-sm text-[--text-muted] mt-0.5">{step.context}</p>
          </div>
        </div>

        {/* Body */}
        <div className="scene-body">
          <p className="text-[15px] text-[--text-secondary] leading-relaxed mb-2">{step.narrative}</p>

          {step.extra}

          {/* Question */}
          <p className="text-[15px] font-semibold text-[--text-primary] mb-4">{step.question}</p>

          {/* Choices */}
          <div className="space-y-2.5">
            {step.choices.map((c, i) => {
              let cls = 'choice-btn';
              if (isAnswered) {
                if (i === chosen && c.correct) cls += ' correct';
                else if (i === chosen && !c.correct) cls += ' wrong';
                else if (c.correct) cls += ' correct';
              }
              return (
                <button
                  key={i}
                  className={cls}
                  disabled={isAnswered}
                  onClick={() => choose(i)}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border
                    ${isAnswered && c.correct ? 'bg-accent-green border-accent-green text-white' : ''}
                    ${isAnswered && i === chosen && !c.correct ? 'bg-accent-red border-accent-red text-white' : ''}
                    ${!isAnswered ? 'bg-bg-secondary border-border text-[--text-muted]' : ''}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{c.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {selected && (
            <div className={`mt-4 p-5 rounded-xl border ${selected.correct ? 'callout-success' : 'callout-danger'} callout`}>
              <span className="text-lg flex-shrink-0">{selected.correct ? '✅' : '❌'}</span>
              <div className="flex-1">
                <div className="font-bold text-sm mb-1">{selected.feedbackTitle}</div>
                <p className="text-sm leading-relaxed mb-0">{selected.feedback}</p>
                {selected.correct && step.tip && (
                  <div className="mt-3 pt-3 border-t border-current/20">
                    <div className="text-xs font-bold mb-1">💡 Pro tip</div>
                    <p className="text-sm leading-relaxed mb-0">{step.tip}</p>
                  </div>
                )}
                {selected.correct ? (
                  <button
                    onClick={next}
                    className="mt-4 bg-accent-blue text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all"
                  >
                    {current + 1 >= totalSteps ? '🎉 See Results' : 'Continue →'}
                  </button>
                ) : (
                  <button
                    onClick={() => setChosen(null)}
                    className="mt-4 border border-border-light text-[--text-primary] px-4 py-2 rounded-lg font-semibold text-sm hover:border-accent-blue hover:bg-blue-500/5 transition-all"
                  >
                    ↩ Try again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
