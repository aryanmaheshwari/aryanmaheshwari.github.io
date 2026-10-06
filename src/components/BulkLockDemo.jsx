import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { LuLock, LuRotateCcw, LuSearch, LuSnowflake, LuLockOpen, LuX } from 'react-icons/lu';
import Button from './ui/Button';
import { cn } from '../lib';

const TOTAL = 1_000_000;
const ROW_H = 40;
const VIEW_H = 360;
const OVERSCAN = 6;
// 1M rows × 40px is taller than browsers allow for one element (~33M px in Chrome, less in Firefox),
// so the scrollable height is capped and scroll position is remapped onto the real offset.
const MAX_SCROLL_PX = 8_000_000;

const OPEN = 0;
const FROZEN = 1;
const LOCKED = 2;
const STATUS = [
  { label: 'Open', dot: 'bg-muted-foreground/50', text: 'text-muted-foreground' },
  { label: 'Frozen', dot: 'bg-sky-500', text: 'text-sky-700 dark:text-sky-300' },
  { label: 'Locked', dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300' },
];

const SITES = [
  'Boston', 'Toronto', 'São Paulo', 'Madrid', 'Lyon', 'Shanghai', 'Mumbai', 'Berlin',
  'Austin', 'Seattle', 'Lisbon', 'Mexico City', 'Osaka', 'Sydney', 'Chicago', 'Denver',
  'Milan', 'Warsaw', 'Seoul', 'Dublin', 'Nairobi', 'Lima', 'Oslo', 'Prague',
];

// Synthetic data is derived from the row index, so there's no million-object array in memory.
// murmur3's finalizer: cheap, and mixes the high bits in so neighbouring rows look unrelated.
function hash(i, seed) {
  let h = (i ^ seed) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return (h ^ (h >>> 16)) >>> 0;
}
const siteOf = (i) => hash(i, 0x9e3779b9) % SITES.length;
const visitsOf = (i) => 1 + (hash(i, 0x85ebca6b) % 12);
const subjectId = (i) => `SUBJ-${String(i + 1).padStart(7, '0')}`;

const fmt = new Intl.NumberFormat('en-US');
const EMPTY = { all: false, ids: new Set() };

function initialStatuses() {
  const s = new Uint8Array(TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    const h = hash(i, 0xc2b2ae35) % 20;
    s[i] = h === 0 ? LOCKED : h === 1 ? FROZEN : OPEN;
  }
  return s;
}

export default function BulkLockDemo() {
  const statusRef = useRef(null);
  if (!statusRef.current) statusRef.current = initialStatuses();
  const status = statusRef.current;

  const [version, setVersion] = useState(0); // bumped whenever statuses change
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sel, setSel] = useState(EMPTY); // when `all`, `ids` holds exclusions
  const [scrollTop, setScrollTop] = useState(0);
  const [last, setLast] = useState(null);
  const anchor = useRef(null);
  const scroller = useRef(null);
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const c = [0, 0, 0];
    for (let i = 0; i < TOTAL; i++) c[status[i]]++;
    return c;
    // `version` is the signal that the typed array was mutated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  // Indices of rows matching the current filter, or null when every row matches.
  const view = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (filter === 'all' && !q) return null;
    const siteMatch = SITES.map((s) => s.toLowerCase().includes(q));
    const idQuery = q.replace(/^(subj-?)/, '').replace(/^0+/, '');
    const numeric = /^\d+$/.test(idQuery);
    const out = new Int32Array(TOTAL);
    let n = 0;
    for (let i = 0; i < TOTAL; i++) {
      if (filter !== 'all' && status[i] !== filter) continue;
      if (q && !siteMatch[siteOf(i)] && !(numeric && String(i + 1).includes(idQuery))) continue;
      out[n++] = i;
    }
    return out.subarray(0, n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery, filter, version]);

  const count = view ? view.length : TOTAL;
  const rowAt = (k) => (view ? view[k] : k);
  const isSelected = (i) => (sel.all ? !sel.ids.has(i) : sel.ids.has(i));
  const selectedCount = sel.all ? count - sel.ids.size : sel.ids.size;

  function resetView() {
    setSel(EMPTY);
    anchor.current = null;
    setScrollTop(0);
    if (scroller.current) scroller.current.scrollTop = 0;
  }

  function toggleRow(k, shift) {
    const i = rowAt(k);
    const select = !isSelected(i);
    const from = shift && anchor.current != null ? Math.min(anchor.current, k) : k;
    const to = shift && anchor.current != null ? Math.max(anchor.current, k) : k;
    const ids = new Set(sel.ids);
    // In "all" mode the set holds exclusions, so selecting means removing.
    const add = sel.all ? !select : select;
    for (let j = from; j <= to; j++) {
      if (add) ids.add(rowAt(j));
      else ids.delete(rowAt(j));
    }
    setSel({ all: sel.all, ids });
    anchor.current = k;
  }

  function toggleAll() {
    setSel(selectedCount === count ? EMPTY : { all: true, ids: new Set() });
  }

  function apply(next, verb) {
    const t0 = performance.now();
    const idx = new Int32Array(selectedCount);
    const prev = new Uint8Array(selectedCount);
    let n = 0;
    const visit = (i) => {
      if (status[i] === next) return;
      idx[n] = i;
      prev[n] = status[i];
      n++;
      status[i] = next;
    };
    if (sel.all) {
      for (let k = 0; k < count; k++) {
        const i = rowAt(k);
        if (!sel.ids.has(i)) visit(i);
      }
    } else {
      sel.ids.forEach(visit);
    }
    const ms = performance.now() - t0;
    setLast({ verb, n, ms, undo: { idx: idx.subarray(0, n), prev: prev.subarray(0, n) } });
    setSel(EMPTY);
    setVersion((v) => v + 1);
  }

  function undo() {
    const { idx, prev } = last.undo;
    for (let k = 0; k < idx.length; k++) status[idx[k]] = prev[k];
    setLast({ ...last, undone: true });
    setVersion((v) => v + 1);
  }

  function onKeyDown(e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'search') return;
    if (e.key === 'Escape') setSel(EMPTY);
    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.preventDefault();
      setSel({ all: true, ids: new Set() });
    }
  }

  // Virtual window: map the (capped) scroll position onto the real row offset.
  const realH = count * ROW_H;
  const scrollH = Math.min(realH, MAX_SCROLL_PX);
  const ratio = scrollH > VIEW_H ? (realH - VIEW_H) / (scrollH - VIEW_H) : 1;
  const offset = scrollTop * ratio;
  const start = Math.max(0, Math.floor(offset / ROW_H) - OVERSCAN);
  const end = Math.min(count, Math.ceil((offset + VIEW_H) / ROW_H) + OVERSCAN);
  const rows = [];
  for (let k = start; k < end; k++) rows.push(k);

  const filters = [
    { key: 'all', label: 'All', n: TOTAL },
    { key: OPEN, label: 'Open', n: counts[OPEN] },
    { key: FROZEN, label: 'Frozen', n: counts[FROZEN] },
    { key: LOCKED, label: 'Locked', n: counts[LOCKED] },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm" onKeyDown={onKeyDown}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">study-data / subjects</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b p-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-64">
          <span className="sr-only">Filter subjects</span>
          <LuSearch className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetView();
            }}
            placeholder="Filter by site or subject ID"
            className="h-9 w-full rounded-md border bg-background pr-3 pl-8 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </label>
        <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1" role="tablist" aria-label="Status">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => {
                setFilter(f.key);
                resetView();
              }}
              className={cn(
                'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                filter === f.key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{fmt.format(f.n)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Header / bulk action bar */}
      <div className="grid h-11 grid-cols-[2.75rem_1fr_auto] items-center border-b px-1 text-xs font-medium text-muted-foreground sm:grid-cols-[2.75rem_10rem_1fr_5rem_6.5rem]">
        <span className="grid place-items-center">
          <input
            type="checkbox"
            aria-label={`Select all ${fmt.format(count)} subjects`}
            checked={count > 0 && selectedCount === count}
            ref={(el) => el && (el.indeterminate = selectedCount > 0 && selectedCount < count)}
            onChange={toggleAll}
            className="size-4 cursor-pointer accent-brand"
          />
        </span>
        {selectedCount > 0 ? (
          <div className="col-span-2 flex items-center gap-1.5 pr-2 sm:col-span-4">
            <span className="mr-auto text-foreground tabular-nums">{fmt.format(selectedCount)} selected</span>
            <Button size="sm" variant="outline" onClick={() => apply(FROZEN, 'Froze')}>
              <LuSnowflake /> <span className="hidden sm:inline">Freeze</span>
            </Button>
            <Button size="sm" onClick={() => apply(LOCKED, 'Locked')}>
              <LuLock /> Lock
            </Button>
            <Button size="sm" variant="outline" onClick={() => apply(OPEN, 'Reopened')}>
              <LuLockOpen /> <span className="hidden sm:inline">Reopen</span>
            </Button>
            <Button size="icon" variant="ghost" className="size-8" onClick={() => setSel(EMPTY)} aria-label="Clear selection">
              <LuX />
            </Button>
          </div>
        ) : (
          <>
            <span>Subject</span>
            <span className="hidden sm:block">Site</span>
            <span className="hidden sm:block">Visits</span>
            <span className="pr-3">Status</span>
          </>
        )}
      </div>

      {/* Virtualized rows */}
      <div
        ref={scroller}
        className="relative overflow-y-auto overscroll-contain"
        style={{ height: VIEW_H }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        tabIndex={0}
        aria-label="Subjects"
      >
        <div style={{ height: Math.max(scrollH, VIEW_H) }} />
        {count === 0 && (
          <p className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">No subjects match.</p>
        )}
        {rows.map((k) => {
          const i = rowAt(k);
          const st = STATUS[status[i]];
          const checked = isSelected(i);
          return (
            <div
              key={i}
              onClick={(e) => toggleRow(k, e.shiftKey)}
              className={cn(
                'absolute inset-x-0 grid cursor-pointer select-none grid-cols-[2.75rem_1fr_auto] items-center border-b px-1 text-sm transition-colors sm:grid-cols-[2.75rem_10rem_1fr_5rem_6.5rem]',
                checked ? 'bg-brand-soft' : 'hover:bg-muted/60',
              )}
              style={{ height: ROW_H, top: scrollTop + k * ROW_H - offset }}
            >
              <span className="grid place-items-center">
                <input
                  type="checkbox"
                  aria-label={`Select ${subjectId(i)}`}
                  checked={checked}
                  onChange={() => {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRow(k, e.shiftKey);
                  }}
                  className="size-4 cursor-pointer accent-brand"
                />
              </span>
              <span className="font-mono text-xs">{subjectId(i)}</span>
              <span className="hidden truncate text-muted-foreground sm:block">
                {100 + siteOf(i)} · {SITES[siteOf(i)]}
              </span>
              <span className="hidden font-mono text-xs text-muted-foreground tabular-nums sm:block">{visitsOf(i)}</span>
              <span className={cn('flex items-center gap-1.5 pr-3 text-xs font-medium', st.text)}>
                <span className={cn('size-1.5 rounded-full', st.dot)} />
                {st.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t bg-muted/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span className="tabular-nums">
          {fmt.format(count)} rows · {rows.length} in the DOM
        </span>
        {last ? (
          <span className="flex items-center gap-2 tabular-nums" aria-live="polite">
            {last.undone ? 'Undone' : `${last.verb} ${fmt.format(last.n)} in ${last.ms.toFixed(1)} ms`}
            {!last.undone && last.n > 0 && (
              <button type="button" onClick={undo} className="inline-flex cursor-pointer items-center gap-1 text-foreground hover:underline">
                <LuRotateCcw className="size-3" /> Undo
              </button>
            )}
          </span>
        ) : (
          <span className="hidden sm:inline">Shift-click for ranges · ⌘A selects all · Esc clears</span>
        )}
      </div>
    </div>
  );
}
