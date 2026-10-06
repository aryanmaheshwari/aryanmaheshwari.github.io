import { cn } from '../../lib';

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  outline: 'border bg-card hover:bg-muted shadow-xs',
  ghost: 'hover:bg-muted',
};

const sizes = {
  default: 'h-9 px-4',
  sm: 'h-8 px-3 text-[13px]',
  icon: 'size-9',
};

// Renders an <a> when given href, otherwise a <button>.
export default function Button({ variant = 'default', size = 'default', className, href, ...props }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
    variants[variant],
    sizes[size],
    className,
  );
  if (href) {
    const external = /^https?:/.test(href);
    return <a href={href} className={classes} {...(external && { target: '_blank', rel: 'noreferrer' })} {...props} />;
  }
  return <button type="button" className={classes} {...props} />;
}
