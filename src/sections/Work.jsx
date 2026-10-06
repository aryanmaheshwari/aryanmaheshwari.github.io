import Section from '../components/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { caseStudies } from '../data/content';

export default function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="Problems I've owned end to end">
      <div className="grid gap-4 md:grid-cols-3">
        {caseStudies.map((c, i) => (
          <Card
            key={c.title}
            className="group relative flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span>{c.company}</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">{c.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
            <p className="mt-6 inline-flex w-fit items-center rounded-md bg-brand-soft px-2 py-1 font-mono text-xs font-medium text-brand">
              {c.outcome}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t pt-4">
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
