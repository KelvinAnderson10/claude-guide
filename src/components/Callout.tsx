type CalloutVariant = 'tip' | 'warning' | 'success' | 'danger' | 'orange';

const ICONS: Record<CalloutVariant, string> = {
  tip:     '💡',
  warning: '⚠️',
  success: '✅',
  danger:  '🚨',
  orange:  '🔥',
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  icon?: string;
}

export default function Callout({ variant = 'tip', title, children, icon }: CalloutProps) {
  return (
    <div className={`callout callout-${variant}`}>
      <span className="text-lg flex-shrink-0 mt-0.5">{icon ?? ICONS[variant]}</span>
      <div className="flex-1">
        {title && <strong className="block mb-1">{title}</strong>}
        {children}
      </div>
    </div>
  );
}
