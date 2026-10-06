import { useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';
import Button from './ui/Button';
import { profile } from '../data/content';

export default function CopyEmail({ variant = 'outline', size }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <Button variant={variant} size={size} onClick={copy} aria-live="polite">
      {copied ? <LuCheck className="text-brand" /> : <LuCopy />}
      {copied ? 'Copied!' : profile.email}
    </Button>
  );
}
