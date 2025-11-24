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
    <button type="button" className="btn btn-primary" onClick={onCopy}>
      {copied ? 'Copied' : 'Copy install cmd'}
    </button>
  );
}
