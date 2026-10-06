import { cn } from '../../lib';

export default function Card({ className, ...props }) {
  return <div className={cn('rounded-xl border bg-card shadow-xs', className)} {...props} />;
}
