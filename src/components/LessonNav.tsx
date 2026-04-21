import Link from 'next/link';

interface LessonNavProps {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <div className="flex justify-between items-center mt-16 pt-7 border-t border-border">
      {prev ? (
        <Link href={prev.href} className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border text-[--text-secondary] text-sm no-underline hover:border-accent-blue hover:text-[--text-primary] hover:bg-blue-500/5 transition-all duration-150 max-w-[220px]">
          <span>←</span>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[--text-muted]">Previous</div>
            <div className="font-semibold text-[--text-primary] text-[13px]">{prev.label}</div>
          </div>
        </Link>
      ) : <div />}

      {next && (
        <Link href={next.href} className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border text-[--text-secondary] text-sm no-underline hover:border-accent-blue hover:text-[--text-primary] hover:bg-blue-500/5 transition-all duration-150 max-w-[220px] text-right">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[--text-muted]">Next</div>
            <div className="font-semibold text-[--text-primary] text-[13px]">{next.label}</div>
          </div>
          <span>→</span>
        </Link>
      )}
    </div>
  );
}
