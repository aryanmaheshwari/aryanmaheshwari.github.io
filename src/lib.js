export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Seconds as m:ss, for video timestamps.
export const timestamp = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
