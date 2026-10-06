import { LuArrowUpRight } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa6';
import Section from '../components/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { profile, projects } from '../data/content';

const LANG_COLOR = { TypeScript: 'bg-sky-500', JavaScript: 'bg-amber-400' };

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Side projects" title="Things I build for fun">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.title} className="group transition-all hover:-translate-y-0.5 hover:shadow-md">
            <a href={p.href} target="_blank" rel="noreferrer" className="flex h-full flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <FaGithub className="size-3.5" /> aryanmaheshwari/{p.href.split('/').pop()}
                </span>
                <LuArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="mr-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={`size-2.5 rounded-full ${LANG_COLOR[p.language] ?? 'bg-muted-foreground'}`} />
                  {p.language}
                </span>
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </a>
          </Card>
        ))}
      </div>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <FaGithub className="size-4" /> More on GitHub <LuArrowUpRight className="size-3.5" />
      </a>
    </Section>
  );
}
