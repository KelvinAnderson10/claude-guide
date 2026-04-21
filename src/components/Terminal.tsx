'use client';

import { useState } from 'react';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Terminal({ title = 'bash', children, className = '' }: TerminalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = document.getElementById(`term-${title}`)?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className={`terminal my-4 ${className}`}>
      <div className="terminal-header">
        <div className="flex gap-1.5">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
        </div>
        <span className="text-xs text-[--text-muted] ml-2">{title}</span>
        <button
          onClick={handleCopy}
          className={`ml-auto text-[11px] px-2.5 py-1 rounded border transition-all duration-150 font-mono
            ${copied
              ? 'text-accent-green border-accent-green/50'
              : 'text-[--text-muted] border-border hover:text-[--text-primary] hover:border-accent-blue/50'}`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="terminal-body" id={`term-${title}`}>
        {children}
      </div>
    </div>
  );
}

export function TLine({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TBlank() {
  return <div>&nbsp;</div>;
}
