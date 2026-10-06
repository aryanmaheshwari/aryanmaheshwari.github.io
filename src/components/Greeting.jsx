import { useEffect, useState } from 'react';
import { greetings } from '../data/content';

// Cycles through a greeting in each language Aryan speaks.
export default function Greeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % greetings.length), 2400);
    return () => clearInterval(id);
  }, []);

  const g = greetings[index];
  return (
    <span key={g.lang} lang={g.lang} dir={g.dir} className="animate-fade-up inline-block">
      {g.text}
    </span>
  );
}
