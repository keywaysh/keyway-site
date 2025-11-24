"use client";

import { useState } from 'react';

type InstallBlockProps = {
  commands: string;
};

export function InstallBlock({ commands }: InstallBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div className="install-block">
      <pre aria-label="Install commands">
        <code>{commands}</code>
      </pre>
      <button className="btn btn-secondary copy-btn" type="button" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
