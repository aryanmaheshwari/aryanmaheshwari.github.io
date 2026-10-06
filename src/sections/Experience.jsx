import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import Section from '../components/Section';
import Badge from '../components/ui/Badge';
import { education, experience } from '../data/content';

const PREVIEW = 4;

function Dot({ muted }) {
  return (
    <span
      className={`absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full border-2 border-background ring-1 ring-border sm:-left-[calc(2rem+5px)] ${
        muted ? 'bg-muted-foreground/40' : 'bg-brand'
      }`}
    />
  );
}

function Job({ job }) {
  const [open, setOpen] = useState(false);
  const hidden = job.highlights.length - PREVIEW;
  const shown = open ? job.highlights : job.highlights.slice(0, PREVIEW);

  return (
    <li className="relative">
      <Dot />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          {job.role} <span className="text-muted-foreground">· {job.company}</span>
        </h3>
        <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
      </div>
      <p className="mt-0.5 text-sm text-muted-foreground">{job.location}</p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {shown.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
            {h}
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-foreground hover:underline"
        >
          {open ? 'Show less' : `Show all ${job.highlights.length}`}
          <LuChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="relative space-y-12 border-l pl-6 sm:pl-8">
        {experience.map((job) => (
          <Job key={job.company} job={job} />
        ))}
        <li className="relative">
          <Dot muted />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold tracking-tight">
              {education.degree} <span className="text-muted-foreground">· {education.school}</span>
            </h3>
            <p className="font-mono text-xs text-muted-foreground">{education.period}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{education.location}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {education.coursework.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>
        </li>
      </ol>
    </Section>
  );
}
