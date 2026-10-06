import { LuArrowRight, LuMapPin } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import Button from '../components/ui/Button';
import Greeting from '../components/Greeting';
import { profile, stats } from '../data/content';
import headshot from '../assets/headshot.jpg';

export default function Hero() {
  return (
    <section id="top" className="relative pt-16 pb-12 sm:pt-24">
      <div className="hero-grid pointer-events-none absolute inset-x-0 -top-14 -z-10 h-[520px]" />

      <div className="animate-fade-up flex flex-wrap items-center gap-3">
        <img
          src={headshot}
          alt={profile.name}
          width="48"
          height="48"
          className="size-12 rounded-full object-cover ring-1 ring-border"
        />
        {profile.openToWork && (
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium shadow-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Open to new roles
          </span>
        )}
      </div>

      <p className="animate-fade-up mt-8 font-serif text-2xl italic text-muted-foreground [animation-delay:60ms] sm:text-3xl">
        <Greeting />, I'm Aryan.
      </p>
      <h1 className="animate-fade-up mt-2 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight [animation-delay:120ms] sm:text-6xl">
        I turn messy customer problems into AI agents that{' '}
        <span className="font-serif font-normal italic text-brand">ship.</span>
      </h1>
      <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground [animation-delay:180ms] sm:text-lg">
        Forward Deployed Engineer at BackOps AI, building and running agentic systems for enterprise
        customers. Before that I was the founding frontend engineer at Spare CS, and spent three years
        at Veeva Systems building clinical-trial analytics at the scale of 1M+ subjects.
      </p>

      <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-2 [animation-delay:240ms]">
        <Button href="#work">
          See my work <LuArrowRight />
        </Button>
        <Button href={profile.github} variant="outline" size="icon" aria-label="GitHub">
          <FaGithub />
        </Button>
        <Button href={profile.linkedin} variant="outline" size="icon" aria-label="LinkedIn">
          <FaLinkedin />
        </Button>
        <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <LuMapPin className="size-4" /> {profile.location}
        </span>
      </div>

      <dl className="animate-fade-up mt-16 grid grid-cols-2 overflow-hidden rounded-xl border bg-card shadow-xs [animation-delay:300ms] lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-5 ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">{s.value}</dd>
            <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
