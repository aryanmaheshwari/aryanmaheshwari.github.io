import { useEffect, useState } from 'react';
import { LuBot, LuCheck, LuCircleAlert, LuCircleDashed, LuLoaderCircle, LuMinus, LuPlay, LuRotateCcw, LuUserRound } from 'react-icons/lu';
import Button from './ui/Button';
import { cn } from '../lib';

// Child agents the parent fans out to. `transient` failures are worth one retry; the rest need a human.
const STEPS = [
  { id: 'extract', name: 'extract_claim', deps: [], ms: [300, 550], error: 'Schema check failed: missing claim_amount', transient: false },
  { id: 'shipment', name: 'lookup_shipment', deps: ['extract'], ms: [450, 900], error: 'Carrier API timed out (504)', transient: true },
  { id: 'policy', name: 'check_policy', deps: ['extract'], ms: [350, 700], error: 'Retrieved 0 policy docs above threshold', transient: true },
  { id: 'liability', name: 'assess_liability', deps: ['shipment', 'policy'], ms: [400, 750], error: 'Low confidence (0.41 < 0.70)', transient: false },
  { id: 'draft', name: 'draft_resolution', deps: ['liability'], ms: [450, 800], error: 'Guardrail: cites an unverified amount', transient: true },
];

// Per-step failure odds used when simulating a batch of eval runs.
const FAIL_RATE = { extract: 0.02, shipment: 0.11, policy: 0.07, liability: 0.04, draft: 0.03 };
const RETRY_SUCCESS = 0.9;

const TICKETS = [
  { id: 'CLM-20417', type: 'Damaged pallet', carrier: 'Ridgeline Freight', amount: '$2,340', resolution: 'Approve the full $2,340 and file a chargeback with Ridgeline Freight.' },
  { id: 'CLM-20422', type: 'Late delivery', carrier: 'Northbay Logistics', amount: '$610', resolution: 'Issue a $305 service credit; the delay falls in the partial-refund window.' },
  { id: 'CLM-20431', type: 'Missing proof of delivery', carrier: 'Coastal Carriers', amount: '$1,185', resolution: 'Hold the claim and request proof of delivery from Coastal Carriers within 48 hours.' },
];

const rand = ([lo, hi]) => lo + Math.random() * (hi - lo);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Lays out one run on a timeline: when each child starts, how each attempt ends, what gets skipped.
function planRun(failId, retry) {
  const steps = {};
  let escalation = null;
  for (const s of STEPS) {
    if (s.deps.some((d) => steps[d].final === 'failed' || steps[d].final === 'skipped')) {
      steps[s.id] = { attempts: [], final: 'skipped', end: 0 };
      continue;
    }
    let t = Math.max(0, ...s.deps.map((d) => steps[d].end)) + 40;
    if (s.id === failId) {
      const d1 = rand(s.ms) * 0.7;
      const attempts = [{ start: t, end: t + d1, ok: false }];
      t += d1;
      if (retry && s.transient) {
        const d2 = rand(s.ms);
        attempts.push({ start: t + 80, end: t + 80 + d2, ok: true });
        steps[s.id] = { attempts, final: 'recovered', end: t + 80 + d2 };
      } else {
        steps[s.id] = { attempts, final: 'failed', end: t };
        escalation = { step: s, at: t };
      }
    } else {
      const d = rand(s.ms);
      steps[s.id] = { attempts: [{ start: t, end: t + d, ok: true }], final: 'ok', end: t + d };
    }
  }
  const total = Math.max(...Object.values(steps).map((x) => x.end)) + 150;
  return { steps, total, escalation, retry };
}

const emptyStats = () => ({
  runs: 0,
  resolved: 0,
  escalated: 0,
  recovered: 0,
  steps: Object.fromEntries(STEPS.map((s) => [s.id, { runs: 0, ok: 0, failed: 0, recovered: 0 }])),
});

// Folds per-step outcomes ({ stepId: 'ok' | 'failed' | 'recovered' | 'skipped' }) into the eval table.
function addOutcome(stats, outcome) {
  const next = { ...stats, steps: { ...stats.steps }, runs: stats.runs + 1 };
  let escalated = false;
  let recovered = false;
  for (const [id, final] of Object.entries(outcome)) {
    if (final === 'skipped') continue;
    const s = { ...next.steps[id], runs: next.steps[id].runs + 1 };
    if (final === 'ok') s.ok++;
    if (final === 'recovered') (s.recovered++, s.ok++, (recovered = true));
    if (final === 'failed') (s.failed++, (escalated = true));
    next.steps[id] = s;
  }
  if (escalated) next.escalated++;
  else next.resolved++;
  if (recovered && !escalated) next.recovered++;
  return next;
}

function simulateOutcome(retry) {
  const out = {};
  for (const s of STEPS) {
    if (s.deps.some((d) => out[d] === 'failed' || out[d] === 'skipped')) out[s.id] = 'skipped';
    else if (Math.random() >= FAIL_RATE[s.id]) out[s.id] = 'ok';
    else out[s.id] = retry && s.transient && Math.random() < RETRY_SUCCESS ? 'recovered' : 'failed';
  }
  return out;
}

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

function stepState(run, id, t) {
  const s = run.steps[id];
  if (s.final === 'skipped') return run.escalation && t >= run.escalation.at ? 'skipped' : 'queued';
  if (t < s.attempts[0].start) return 'queued';
  const last = s.attempts[s.attempts.length - 1];
  if (t < last.end) return s.attempts.length > 1 && t >= s.attempts[1].start ? 'retrying' : t < s.attempts[0].end ? 'running' : 'failed-retrying';
  return s.final;
}

const STATE_UI = {
  queued: { icon: LuCircleDashed, label: 'queued', cls: 'text-muted-foreground' },
  running: { icon: LuLoaderCircle, label: 'running', cls: 'text-foreground', spin: true },
  'failed-retrying': { icon: LuCircleAlert, label: 'failed', cls: 'text-red-600 dark:text-red-400' },
  retrying: { icon: LuRotateCcw, label: 'retry 1', cls: 'text-amber-600 dark:text-amber-400', spin: true },
  ok: { icon: LuCheck, label: 'ok', cls: 'text-brand' },
  recovered: { icon: LuRotateCcw, label: 'recovered', cls: 'text-amber-600 dark:text-amber-400' },
  failed: { icon: LuCircleAlert, label: 'failed', cls: 'text-red-600 dark:text-red-400' },
  skipped: { icon: LuMinus, label: 'skipped', cls: 'text-muted-foreground' },
};

const selectCls =
  'h-9 cursor-pointer rounded-md border bg-background px-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40';

export default function AgentTraceDemo() {
  const [ticketIdx, setTicketIdx] = useState(0);
  const [failMode, setFailMode] = useState('random');
  const [retry, setRetry] = useState(true);
  const [run, setRun] = useState(null);
  const [t, setT] = useState(0);
  const [stats, setStats] = useState(emptyStats);
  const ticket = TICKETS[ticketIdx];

  useEffect(() => {
    if (!run) return;
    const record = () => setStats((prev) => addOutcome(prev, Object.fromEntries(STEPS.map((s) => [s.id, run.steps[s.id].final]))));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(run.total);
      record();
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const elapsed = now - t0;
      setT(Math.min(elapsed, run.total));
      if (elapsed < run.total) raf = requestAnimationFrame(tick);
      else record();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  const running = run && t < run.total;
  const done = run && t >= run.total;

  function start() {
    const failId =
      failMode === 'none' ? null : failMode === 'random' ? (Math.random() < 0.6 ? pick(STEPS).id : null) : failMode;
    setT(0);
    setRun(planRun(failId, retry));
  }

  function runBatch() {
    setStats((prev) => {
      let next = prev;
      for (let i = 0; i < 100; i++) next = addOutcome(next, simulateOutcome(retry));
      return next;
    });
  }

  const recoveredStep = run && STEPS.find((s) => run.steps[s.id].final === 'recovered');
  const skipped = run ? STEPS.filter((s) => run.steps[s.id].final === 'skipped') : [];
  const finished = run ? STEPS.filter((s) => ['ok', 'recovered'].includes(stepState(run, s.id, t))).length : 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">agents / claim-triage</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-end gap-3 border-b p-3">
        <label className="grid gap-1 text-xs font-medium text-muted-foreground">
          Ticket
          <select className={selectCls} value={ticketIdx} onChange={(e) => setTicketIdx(+e.target.value)} disabled={running}>
            {TICKETS.map((tk, i) => (
              <option key={tk.id} value={i}>
                {tk.id} · {tk.type}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted-foreground">
          Inject failure
          <select className={selectCls} value={failMode} onChange={(e) => setFailMode(e.target.value)} disabled={running}>
            <option value="random">Random</option>
            <option value="none">None</option>
            {STEPS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex h-9 cursor-pointer items-center gap-2 text-sm select-none">
          <span className="relative inline-flex">
            <input type="checkbox" className="peer sr-only" checked={retry} onChange={(e) => setRetry(e.target.checked)} disabled={running} />
            <span className="h-5 w-9 rounded-full bg-border transition-colors peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40" />
            <span className="absolute top-0.5 left-0.5 size-4 rounded-full bg-card shadow-sm transition-transform peer-checked:translate-x-4" />
          </span>
          Retry transient failures
        </label>
        <Button className="ml-auto" onClick={start} disabled={running}>
          <LuPlay /> {run ? 'Run again' : 'Run'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_19rem]">
        {/* Trace waterfall */}
        <div className="min-w-0 p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-muted-foreground">
            <span>
              <span className="font-mono text-foreground">{ticket.id}</span> · {ticket.type} · {ticket.carrier} · {ticket.amount}
            </span>
            {run && <span className="font-mono tabular-nums">{Math.round(t)} ms</span>}
          </div>

          <ol className="space-y-1">
            <li className="grid grid-cols-[8.5rem_1fr_5.5rem] items-center gap-3 rounded-md bg-muted/50 px-2 py-2 sm:grid-cols-[10.5rem_1fr_6rem]">
              <span className="flex items-center gap-2 truncate font-mono text-xs font-medium">
                <LuBot className="size-3.5 shrink-0 text-brand" /> claim_triage
              </span>
              <span className="relative h-2 rounded-full bg-border/60">
                {run && <span className="absolute inset-y-0 left-0 rounded-full bg-foreground/25" style={{ width: `${(t / run.total) * 100}%` }} />}
              </span>
              <span className="text-right text-xs text-muted-foreground">
                {!run ? 'idle' : running ? `${finished}/${STEPS.length} done` : run.escalation ? 'escalated' : 'resolved'}
              </span>
            </li>
            {STEPS.map((s) => {
              const state = run ? stepState(run, s.id, t) : 'queued';
              const ui = STATE_UI[state];
              const Icon = ui.icon;
              const parallel = s.id === 'shipment' || s.id === 'policy';
              return (
                <li key={s.id} className="grid grid-cols-[8.5rem_1fr_5.5rem] items-center gap-3 px-2 py-1.5 sm:grid-cols-[10.5rem_1fr_6rem]">
                  <span className="flex items-center gap-2 truncate pl-3 font-mono text-xs text-muted-foreground">
                    <span className="text-border">{parallel ? '├' : '└'}</span>
                    <span className={cn('truncate', state !== 'queued' && state !== 'skipped' && 'text-foreground')}>{s.name}</span>
                  </span>
                  <span className="relative h-2 rounded-full bg-muted">
                    {run &&
                      run.steps[s.id].attempts.map((a, i) =>
                        t > a.start ? (
                          <span
                            key={i}
                            className={cn(
                              'absolute inset-y-0 rounded-full',
                              t < a.end ? 'animate-pulse bg-brand/70' : a.ok ? 'bg-brand' : 'bg-red-500',
                            )}
                            style={{
                              left: `${(a.start / run.total) * 100}%`,
                              width: `${((Math.min(t, a.end) - a.start) / run.total) * 100}%`,
                            }}
                          />
                        ) : null,
                      )}
                  </span>
                  <span className={cn('flex items-center justify-end gap-1.5 text-xs font-medium', ui.cls)}>
                    <Icon className={cn('size-3.5', ui.spin && 'animate-spin')} />
                    {ui.label}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Result */}
          <div className="mt-4 min-h-[5.5rem] rounded-lg border p-3 text-sm" aria-live="polite">
            {!run && <p className="text-muted-foreground">Press Run to send this claim through the agents.</p>}
            {running && <p className="text-muted-foreground">Parent agent is waiting on its children…</p>}
            {done && !run.escalation && (
              <>
                <p className="flex items-center gap-2 font-medium">
                  <LuCheck className="size-4 text-brand" /> Resolved automatically
                </p>
                <p className="mt-1 text-muted-foreground">{ticket.resolution}</p>
                {recoveredStep && (
                  <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
                    Recovered from a transient failure in <span className="font-mono">{recoveredStep.name}</span>: {recoveredStep.error}. No human needed.
                  </p>
                )}
              </>
            )}
            {done && run.escalation && (
              <>
                <p className="flex items-center gap-2 font-medium">
                  <LuUserRound className="size-4 text-amber-600 dark:text-amber-400" /> Escalated to a human
                </p>
                <p className="mt-1 text-muted-foreground">
                  Failed at <span className="font-mono text-foreground">{run.escalation.step.name}</span>: {run.escalation.step.error}.
                  {run.escalation.step.transient && !run.retry && ' A retry would likely have fixed this.'}
                </p>
                {skipped.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Skipped downstream: <span className="font-mono">{skipped.map((s) => s.name).join(', ')}</span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Evals built from traces */}
        <div className="border-t bg-muted/20 p-3 sm:p-4 lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Evals from traces</p>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{stats.runs} runs</span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { label: 'Auto-resolved', value: pct(stats.resolved, stats.runs) },
              { label: 'Escalated', value: pct(stats.escalated, stats.runs) },
              { label: 'Saved by retry', value: pct(stats.recovered, stats.runs) },
            ].map((m) => (
              <div key={m.label} className="rounded-md border bg-card px-1 py-2">
                <p className="font-mono text-lg font-medium tabular-nums">{stats.runs ? `${m.value}%` : '–'}</p>
                <p className="text-[10px] leading-tight text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          <table className="mt-4 w-full text-xs">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-1.5 font-medium">Sub-agent</th>
                <th className="pb-1.5 text-right font-medium">Pass</th>
                <th className="pb-1.5 text-right font-medium">Fail</th>
              </tr>
            </thead>
            <tbody>
              {STEPS.map((s) => {
                const st = stats.steps[s.id];
                const pass = pct(st.ok, st.runs);
                return (
                  <tr key={s.id} className="border-t">
                    <td className="py-1.5 pr-2">
                      <span className="block truncate font-mono">{s.name}</span>
                      <span className="mt-1 block h-1 rounded-full bg-border">
                        <span className={cn('block h-full rounded-full', pass >= 95 ? 'bg-brand' : 'bg-amber-500')} style={{ width: `${st.runs ? pass : 0}%` }} />
                      </span>
                    </td>
                    <td className="py-1.5 text-right font-mono tabular-nums">{st.runs ? `${pass}%` : '–'}</td>
                    <td className="py-1.5 text-right font-mono text-muted-foreground tabular-nums">{st.failed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={runBatch} disabled={running}>
              Simulate 100 runs
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setStats(emptyStats())} disabled={!stats.runs} aria-label="Reset evals">
              <LuRotateCcw />
            </Button>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
            Try it with retries on, then off, and watch the escalation rate move.
          </p>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t bg-muted/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>1 parent · {STEPS.length} child agents · 2 run in parallel</span>
        <span className="hidden sm:inline">Synthetic tickets · nothing leaves your browser</span>
      </div>
    </div>
  );
}

