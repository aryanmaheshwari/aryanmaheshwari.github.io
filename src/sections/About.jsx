import Section from '../components/Section';
import Badge from '../components/ui/Badge';
import { skills } from '../data/content';
import headshot from '../assets/headshot.jpg';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A little more about me">
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <img
          src={headshot}
          alt="Aryan Maheshwari"
          loading="lazy"
          className="aspect-square w-40 rounded-2xl object-cover ring-1 ring-border md:w-full"
        />
        <div>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              I've spent 4+ years building production systems across the stack. I started on the front
              end, with design systems, accessibility, and data-heavy workflows, and that grew into applied
              AI: RAG assistants, PyTorch models in production, and now multi-agent systems running in live
              customer environments.
            </p>
            <p>
              What I like most is the whole loop: sitting in a discovery call, finding the workflow that's
              quietly eating someone's day, then scoping, shipping, and measuring the thing that fixes it.
              Good UX instincts turn out to matter a lot for agents too.
            </p>
            <p>
              I speak <span className="text-foreground">English, Spanish, Hindi, Urdu, and Portuguese</span>,
              which is part of why building multilingual products is some of my favorite work.
            </p>
          </div>

          <dl className="mt-8 space-y-4">
            {skills.map((s) => (
              <div key={s.group} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-baseline">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.group}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <Badge key={i} className="bg-card text-foreground">
                      {i}
                    </Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
