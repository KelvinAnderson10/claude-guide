import ScenarioEngine from '@/components/ScenarioEngine';
import LessonNav from '@/components/LessonNav';

export default function ScenarioPage() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-orange uppercase tracking-wider mb-3">
          ★ Interactive Scenario
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ background: 'linear-gradient(135deg, #fff 40%, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Ahmad's Journey
        </h1>
        <p className="text-[--text-muted] text-base">
          Follow Ahmad through a real Jira ticket — from first command to merged PR. Make the right choices to ship the feature correctly.
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { icon: '⏱', text: '~10 minutes' },
            { icon: '🎮', text: '10 interactive steps' },
            { icon: '📋', text: 'Based on fincen-fe' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-[12px] text-[--text-muted] bg-bg-card border border-border rounded-lg px-3 py-1.5">
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <ScenarioEngine />

      <LessonNav
        prev={{ href: '/skills', label: 'Skills & Commands' }}
      />
    </div>
  );
}
