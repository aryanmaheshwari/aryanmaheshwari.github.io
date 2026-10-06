import { LuFileText } from 'react-icons/lu';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ThemeToggle';
import { profile } from '../data/content';

const links = [
  { href: '#now', label: 'Now' },
  { href: '#playground', label: 'Playground' },
  { href: '#work', label: 'Veeva' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm font-medium">
          <span className="relative grid size-7 place-items-center rounded-md bg-primary text-[11px] text-primary-foreground">
            am
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-brand ring-2 ring-background" />
          </span>
          <span className="hidden sm:inline">aryan maheshwari</span>
        </a>

        <nav className="flex items-center gap-1">
          <div className="hidden items-center md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
          <Button href={profile.resume} size="sm" className="ml-1">
            <LuFileText /> Resume
          </Button>
        </nav>
      </div>
    </header>
  );
}
