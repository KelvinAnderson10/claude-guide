import { Terminal, TLine, TBlank } from '@/components/Terminal';
import Compare from '@/components/Compare';
import Callout from '@/components/Callout';
import LessonNav from '@/components/LessonNav';

export default function PromptingPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-purple uppercase tracking-wider mb-3">Module 02</div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #fff 40%, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Prompting Mastery
        </h1>
        <p className="text-[--text-muted] text-base">Write prompts that work on the first try, every time.</p>
      </div>

      {/* Anatomy */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-8 mb-4">The Anatomy of a Great Prompt</h2>
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden mb-6">
        {[
          { label: '📍 Location',   color: '#3b82f6', desc: 'Where in the codebase?', example: 'In fincen-fe at src/app/(dashboard)/general-ledger/page.tsx' },
          { label: '🎯 Task',       color: '#f97316', desc: 'What specifically?',      example: 'add an Export to Excel button using @bsim/button with variant="secondary"' },
          { label: '📚 Context',    color: '#a855f7', desc: 'What patterns to follow?', example: 'following the xlsx pattern in src/repositories/audit-trail/export.ts' },
          { label: '📐 Constraints',color: '#22c55e', desc: 'What must/must-not happen?', example: 'The button should be disabled while the table data is loading (isLoading from SWR)' },
          { label: '📄 Output',     color: '#eab308', desc: 'What format/files?',       example: 'Only modify page.tsx and create src/repositories/general-ledger/export.ts' },
        ].map(({ label, color, desc, example }) => (
          <div key={label} className="flex gap-4 px-5 py-3.5 border-b border-border last:border-0">
            <div className="font-bold text-sm min-w-[110px]" style={{ color }}>{label}</div>
            <div className="flex-1">
              <div className="text-xs text-[--text-muted] mb-0.5">{desc}</div>
              <div className="text-sm text-[--text-secondary] font-mono bg-bg-terminal rounded px-2 py-0.5 inline">{example}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="orange" title="The Golden Rule">
        Claude's output quality is directly proportional to your input specificity. A 3-line prompt consistently beats a 1-line prompt. Every file path you include saves a back-and-forth.
      </Callout>

      {/* Example 1 */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-3">Example 1 — Adding a Feature</h2>
      <p className="text-[--text-secondary] text-sm mb-4">Adding an Excel export to the General Ledger page in <strong>fincen-fe</strong>.</p>
      <Compare
        bad={`Add export to excel to the general ledger page`}
        good={`In fincen-fe, add an "Export to Excel" button to the General Ledger page at
src/app/(dashboard)/general-ledger/page.tsx.

Requirements:
- Button: @bsim/button with variant="secondary", label "Export Excel"
- Use the existing xlsx library (already in package.json)
- Export all rows currently displayed in the table (not paginated — full dataset)
- Filename: general-ledger-{YYYY-MM-DD}.xlsx
- Add the export logic to src/repositories/general-ledger/export.ts
- Follow the exact pattern in src/repositories/audit-trail/export.ts

The table data comes from a SWR hook — the variable is called "data".
Button should be disabled when "isLoading" is true.`}
      />

      {/* Example 2 */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-3">Example 2 — Writing Tests</h2>
      <p className="text-[--text-secondary] text-sm mb-4">Writing tests for a repository function in <strong>i-iam-dashboard</strong>.</p>
      <Compare
        bad={`Write tests for the users repository`}
        good={`In i-iam-dashboard, write Jest unit tests for the
src/repositories/users/index.ts functions.

Test file location: src/repositories/users/__tests__/index.test.ts

Functions to test:
- getUsers(params: UserQueryParams) — mocks globalFetcher, verifies query params
- updateUserRole(userId, roleId) — verifies PATCH call with correct body
- deleteUser(userId) — verifies DELETE call

Use the testing pattern from src/repositories/roles/__tests__/index.test.ts.
Mock globalFetcher using jest.mock('../../../repositories/globalFetcher').
Use the mock data from src/api-mock/users.json.`}
      />

      {/* Example 3 */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-3">Example 3 — Creating a Zod Schema</h2>
      <p className="text-[--text-secondary] text-sm mb-4">Adding validation schema for a new form in <strong>rap-fe</strong>.</p>
      <Compare
        bad={`Add form validation for the recovery plan form`}
        good={`In rap-fe, create a Zod validation schema at
src/schemas/recovery-plan.ts for the RecoveryPlan create form.

Fields:
- planName: required string, max 100 chars
- startDate: required date string (ISO 8601)
- endDate: required date string, must be after startDate
- description: optional string, max 500 chars
- priority: required, one of: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
- assigneeId: required number

Follow the exact pattern and export conventions from
src/schemas/action-plan.ts.

Also export the TypeScript type: export type RecoveryPlanFormValues = z.infer<typeof recoveryPlanSchema>`}
      />

      {/* Example 4 */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-3">Example 4 — Debugging</h2>
      <p className="text-[--text-secondary] text-sm mb-4">When something is broken, give Claude the full picture.</p>
      <Compare
        badLabel="❌ Too Vague"
        bad={`The export button isn't working`}
        goodLabel="✅ Debuggable"
        good={`In fincen-fe, the Export Excel button in
src/app/(dashboard)/general-ledger/page.tsx is
throwing this error in the browser console:

  TypeError: Cannot read properties of undefined (reading 'map')
  at buildExcelRows (export.ts:24)

The "data" SWR hook returns: { data: { items: ReportRow[], total: number } }
But the export function at src/repositories/general-ledger/export.ts
calls data.map() directly instead of data.items.map().

Please fix the export.ts function and add a null-safety check.`}
      />

      {/* Example 5 */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-3">Example 5 — Refactoring</h2>
      <p className="text-[--text-secondary] text-sm mb-4">Migrating Context API to Zustand in <strong>i-iam-dashboard</strong>.</p>
      <Compare
        badLabel="❌ Too Broad"
        bad={`Refactor the auth state to use Zustand`}
        goodLabel="✅ Scoped"
        good={`In i-iam-dashboard, migrate only the auth slice of
src/context/authContext/authContext.tsx to a Zustand store.

Create: src/store/useAuthStore.ts
State to migrate: { user, isLoading, isAuthenticated }
Actions to migrate: setUser, clearUser, setLoading

Follow the pattern in src/store/useLayoutStore.ts (already uses Zustand v5).
Do NOT remove authContext.tsx yet — just create the new store.
Update only these two files to use the new store:
- src/components/layout/Header.tsx
- src/app/(protected)/profile/page.tsx`}
      />

      {/* Principles */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Core Principles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '⚛️', title: 'Atomic Tasks', desc: 'One prompt = one clearly scoped task. "Add export AND write tests AND update docs" in one prompt gets messy. Split them.' },
          { icon: '📍', title: 'File Paths First', desc: 'Always include exact paths. src/app/(dashboard)/gl/page.tsx beats "the general ledger page" every time.' },
          { icon: '🔗', title: 'Point to Patterns', desc: 'Tell Claude "follow the pattern in X". This is faster than describing the pattern yourself and gets consistent code.' },
          { icon: '🚫', title: 'State Constraints', desc: 'Tell Claude what NOT to do. "Do not modify middleware.ts" prevents unintended cascading changes.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-bg-card border border-border rounded-xl p-5">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm font-bold text-[--text-primary] mb-1.5">{title}</div>
            <div className="text-xs text-[--text-secondary] leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      {/* Interactive prompt builder */}
      <h2 className="text-xl font-bold text-[--text-primary] mt-10 mb-4">Quick Prompt Template</h2>
      <div className="bg-bg-terminal border border-border rounded-xl p-5 font-mono text-sm">
        <div className="text-[--text-muted] text-xs mb-3 uppercase tracking-wider font-bold">Copy and fill in the blanks</div>
        <pre className="text-[--text-secondary] whitespace-pre-wrap leading-8">{`In [PROJECT], [add/fix/refactor] [WHAT] at [FILE PATH].

[Requirements / behavior description]

Follow the pattern in [REFERENCE FILE].
Do not modify [FILES TO LEAVE ALONE].`}</pre>
      </div>

      <LessonNav
        prev={{ href: '/setup', label: 'Setup & /init' }}
        next={{ href: '/tokens', label: 'Token Economy' }}
      />
    </div>
  );
}
