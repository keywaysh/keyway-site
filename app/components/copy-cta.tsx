"use client";

import { useState } from 'react';

const commands = 'npm i -g @keywaysh/cli\nkeyway init';

export function CopyCtaButton() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div className="hero-copy">
      <pre aria-label="Install commands">
        <code>{commands}</code>
      </pre>
      <button type="button" className="btn btn-primary copy-hero-btn" onClick={onCopy}>
        <CopyIcon />
        {copied ? 'Copied' : 'Try Keyway'}
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
