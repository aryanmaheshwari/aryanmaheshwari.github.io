import { cn } from '../../lib';

export default function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border bg-muted/50 px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
