import { useRef } from 'react';
import { LuCheck, LuPlay, LuScissors } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa6';
import Section from '../components/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import PhoneVideo from '../components/PhoneVideo';
import { timestamp } from '../lib';
import { featured as f } from '../data/content';

function List({ icon, title, items }) {
  const Icon = icon;
  return (
    <div>
      <h3 className="flex items-center gap-2 font-semibold tracking-tight">
        <Icon className="size-4 text-brand" /> {title}
      </h3>
      <dl className="mt-3 divide-y border-y">
        {items.map((i) => (
          <div key={i.what} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="text-sm font-medium">{i.what}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">{i.why}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function CaseStudy() {
  const player = useRef(null);
  const seek = (t) => player.current?.seek(t);

  return (
    <Section
      id="product"
      eyebrow={f.eyebrow}
      title={
        <>
          {f.name}: <span className="font-serif font-normal italic text-muted-foreground">{f.title}</span>
        </>
      }
    >
      <div className="grid items-start gap-10 md:grid-cols-[300px_1fr] lg:gap-14">
        <PhoneVideo ref={player} video={f.video} chapters={f.chapters} />

        <div>
          <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">{f.problem}</p>
          <p className="mt-4 border-l-2 border-brand pl-4 text-base font-medium leading-relaxed sm:text-lg">{f.bet}</p>

          <dl className="mt-8 grid grid-cols-2 overflow-hidden rounded-xl border bg-card shadow-xs">
            {f.facts.map((x, i) => (
              <div key={x.label} className={`p-4 ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t' : ''}`}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{x.label}</dt>
                <dd className="mt-1 text-sm font-medium leading-snug">{x.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">In the demo</h3>
          <ol className="mt-2 grid gap-x-6 sm:grid-cols-2">
            {f.chapters.map((c) => (
              <li key={c.t}>
                <button
                  type="button"
                  onClick={() => seek(c.t)}
                  className="group flex w-full cursor-pointer items-baseline gap-3 border-b py-2 text-left text-sm"
                >
                  <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{timestamp(c.t)}</span>
                  <span className="group-hover:text-brand">{c.label}</span>
                </button>
              </li>
            ))}
          </ol>

          {f.repo && (
            <Button href={f.repo} variant="outline" className="mt-6">
              <FaGithub /> View the code
            </Button>
          )}
        </div>
      </div>

      <h3 className="mt-20 text-xl font-semibold tracking-tight">The product calls I made</h3>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every feature started as a decision about who this is for and what they’d trust. Each one links to the moment it
        shows up in the demo.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {f.decisions.map((d, i) => (
          <Card key={d.title} className="flex flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              <button
                type="button"
                onClick={() => seek(d.t)}
                aria-label={`Watch “${d.title}” in the demo at ${timestamp(d.t)}`}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-brand-soft px-2 py-1 font-mono text-xs font-medium text-brand transition-opacity hover:opacity-80"
              >
                <LuPlay className="size-3" /> {timestamp(d.t)}
              </button>
            </div>
            <h4 className="mt-5 text-lg font-semibold leading-snug tracking-tight">{d.title}</h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            <p className="mt-5 border-t pt-4 text-sm leading-relaxed">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Trade-off · </span>
              {d.tradeoff}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <List icon={LuScissors} title="What I cut, on purpose" items={f.cuts} />
        <List icon={LuCheck} title="What I didn’t cut" items={f.craft} />
      </div>

      <details className="group mt-10 text-sm text-muted-foreground">
        <summary className="cursor-pointer list-none font-medium text-foreground hover:underline">
          How it’s built <span className="inline-block transition-transform group-open:rotate-90">›</span>
        </summary>
        <ul className="mt-3 max-w-3xl list-disc space-y-1.5 pl-5">
          {f.build.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
