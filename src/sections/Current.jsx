import { LuSparkles } from 'react-icons/lu';
import Section from '../components/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { current } from '../data/content';

export default function Current() {
  return (
    <Section id="now" eyebrow={`Now · ${current.company}`} title="Agents in production, for real customers">
      <p className="-mt-6 mb-8 max-w-2xl text-muted-foreground">{current.intro}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {current.items.map((c) => (
          <Card
            key={c.title}
            className="group relative flex flex-col overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand-soft blur-2xl transition-opacity group-hover:opacity-100 md:opacity-0" />
            <div className="relative flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <LuSparkles className="size-3.5 text-brand" /> {current.company}
              </span>
              <span>2026 —</span>
            </div>
            <h3 className="relative mt-6 text-lg font-semibold tracking-tight">{c.title}</h3>
            <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
            <p className="relative mt-6 inline-flex w-fit items-center rounded-md bg-brand-soft px-2 py-1 font-mono text-xs font-medium text-brand">
              {c.outcome}
            </p>
            <div className="relative mt-4 flex flex-wrap gap-1.5 border-t pt-4">
              {c.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
