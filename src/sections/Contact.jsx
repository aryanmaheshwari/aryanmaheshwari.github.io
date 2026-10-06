import { LuArrowUpRight, LuFileText } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CopyEmail from '../components/CopyEmail';
import { profile } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <Card className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Contact</p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Let's build something <span className="font-serif font-normal italic">people love</span> to use.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            I'm open to forward deployed, product, and applied AI engineering roles. The fastest way to reach me is email.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <CopyEmail variant="default" />
            <Button href={profile.resume} variant="outline">
              <LuFileText /> Resume
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Tailwind.</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <FaGithub /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <FaLinkedin /> LinkedIn <LuArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
