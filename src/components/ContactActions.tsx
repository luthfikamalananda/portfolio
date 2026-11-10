"use client";

import { Check, Copy, FileDown } from "lucide-react";
import { useState } from "react";
import { useUI } from "./UIProvider";

export function ContactActions() {
  const { content, copyEmail, setResumeOpen } = useUI();
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={async () => {
          if (await copyEmail()) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        }}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-on-accent transition-transform hover:-translate-y-0.5"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? content.ui.contact.copied : content.ui.contact.copy}
      </button>
      <button
        type="button"
        onClick={() => setResumeOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium transition-colors hover:border-fg"
      >
        <FileDown className="size-4" /> {content.ui.contact.resume}
      </button>
    </div>
  );
}
