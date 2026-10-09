import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LuPause, LuPlay } from 'react-icons/lu';
import { cn, timestamp } from '../lib';

// A product demo in a phone frame. Plays muted while on screen (unless the visitor prefers reduced
// motion or paused it), with a progress bar split into chapters. `ref.seek(t)` jumps to a moment.
export default function PhoneVideo({ ref, video, chapters }) {
  const el = useRef(null);
  const frame = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const v = el.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // timeupdate only fires a few times a second, so follow the playhead per frame while playing.
  useEffect(() => {
    if (!playing) return;
    let raf;
    const tick = () => {
      setTime(el.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  function play() {
    userPaused.current = false;
    el.current.play().catch(() => {});
  }

  function toggle() {
    if (el.current.paused) return play();
    userPaused.current = true;
    el.current.pause();
  }

  function seek(t) {
    el.current.currentTime = t;
    setTime(t);
    play();
    const r = frame.current.getBoundingClientRect();
    if (r.bottom < 80 || r.top > innerHeight - 80) frame.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  useImperativeHandle(ref, () => ({ seek }));

  const active = chapters.findLastIndex((c) => time >= c.t);
  const ends = chapters.map((c, i) => chapters[i + 1]?.t ?? video.duration);

  return (
    <figure className="mx-auto w-full max-w-[300px]">
      <div ref={frame} className="relative rounded-[2.6rem] bg-zinc-900 p-2.5 shadow-xl ring-1 ring-black/10 dark:bg-zinc-800 dark:ring-white/10">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[2.1rem] bg-white">
          <video
            ref={el}
            className="size-full object-cover"
            poster={video.poster}
            preload="metadata"
            muted
            loop
            playsInline
            aria-label={video.label}
            onPlay={() => (setPlaying(true), setStarted(true))}
            onPause={() => setPlaying(false)}
            onSeeked={(e) => setTime(e.currentTarget.currentTime)}
          >
            <source src={video.src} type="video/mp4" />
          </video>
          {!started && (
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 grid cursor-pointer place-items-center bg-black/5 transition-colors hover:bg-black/10"
              aria-label="Play the demo"
            >
              <span className="grid size-16 place-items-center rounded-full bg-zinc-900/85 text-white shadow-lg backdrop-blur">
                <LuPlay className="size-6 translate-x-0.5" />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Chapter-segmented progress. The chapter list next to the video is the keyboard path. */}
      <div className="mt-4 flex gap-0.5" aria-hidden="true">
        {chapters.map((c, i) => {
          const fill = Math.min(1, Math.max(0, (time - c.t) / (ends[i] - c.t)));
          return (
            <div
              key={c.t}
              onClick={() => seek(c.t)}
              title={c.label}
              className="group cursor-pointer py-1.5"
              style={{ flexGrow: ends[i] - c.t, flexBasis: 0 }}
            >
              <div className="h-1 overflow-hidden rounded-full bg-border transition-[height] group-hover:h-1.5">
                <div className="h-full bg-brand" style={{ width: `${fill * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause the demo' : 'Play the demo'}
          className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-md hover:bg-muted hover:text-foreground"
        >
          {playing ? <LuPause className="size-4" /> : <LuPlay className="size-4" />}
        </button>
        <span className={cn('truncate font-medium', started && 'text-foreground')}>
          {started ? chapters[Math.max(0, active)].label : 'Product demo · no sound'}
        </span>
        <span className="ml-auto font-mono tabular-nums">
          {timestamp(time)} / {timestamp(video.duration)}
        </span>
      </figcaption>
    </figure>
  );
}
