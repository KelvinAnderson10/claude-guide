interface CompareProps {
  badLabel?: string;
  goodLabel?: string;
  bad: string;
  good: string;
}

export default function Compare({ bad, good, badLabel = '❌ Weak Prompt', goodLabel = '✅ Strong Prompt' }: CompareProps) {
  return (
    <div className="compare-grid">
      <div className="compare-bad">
        <div className="text-[11px] font-bold uppercase tracking-wider text-accent-red mb-2.5 flex items-center gap-1.5">
          {badLabel}
        </div>
        <pre>{bad}</pre>
      </div>
      <div className="compare-good">
        <div className="text-[11px] font-bold uppercase tracking-wider text-accent-green mb-2.5 flex items-center gap-1.5">
          {goodLabel}
        </div>
        <pre>{good}</pre>
      </div>
    </div>
  );
}
