"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn ${copied ? "copied" : ""}`}
      title="Copy to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
