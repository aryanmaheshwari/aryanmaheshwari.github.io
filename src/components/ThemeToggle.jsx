import { useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import Button from './ui/Button';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    setDark(next);
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
      {dark ? <LuSun /> : <LuMoon />}
    </Button>
  );
}
