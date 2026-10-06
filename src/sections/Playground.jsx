import Section from '../components/Section';
import AgentTraceDemo from '../components/AgentTraceDemo';
import BulkLockDemo from '../components/BulkLockDemo';

function Demo({ label, title, children, notes, demo }) {
  return (
    <div>
      <p className="font-mono text-xs text-muted-foreground">{label}</p>
      <h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 mb-6 max-w-2xl text-muted-foreground">{children}</p>
      {demo}
      <details className="group mt-4 text-sm text-muted-foreground">
        <summary className="cursor-pointer list-none font-medium text-foreground hover:underline">
          How it's built <span className="inline-block transition-transform group-open:rotate-90">›</span>
        </summary>
        <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export default function Playground() {
  return (
    <Section id="playground" eyebrow="Playground" title="Don't just read about it. Try it.">
      <p className="-mt-6 mb-12 max-w-2xl text-muted-foreground">
        Small, from-scratch rebuilds of patterns from my real work, running on synthetic data right in
        your browser. No company code or customer data.
      </p>
      <div className="space-y-20">
        <Demo
          label="01 · Forward deployed work"
          title="Agent orchestration that knows exactly what broke"
          demo={<AgentTraceDemo />}
          notes={[
            'A parent agent fans each claim out to specialized child agents; two of them run in parallel once the claim is extracted.',
            'Every child reports success or failure on its own, so a bad run points at one sub-task instead of "the agent failed".',
            'Failures are typed: transient ones (timeouts, empty retrievals) get one retry, and only the rest escalate to a human, along with the exact failing step.',
            'Each finished run is folded into a per-sub-agent eval table, the same idea as turning production traces into eval sets.',
          ]}
        >
          The parent–child pattern I designed at BackOps AI, rebuilt small with fake freight claims. Run a
          ticket, inject a failure, and watch the parent pinpoint it, retry what's worth retrying, and only
          escalate what truly needs a person. Every run feeds the eval table.
        </Demo>

        <Demo
          label="02 · Product engineering at scale"
          title="Bulk actions on a million rows"
          demo={<BulkLockDemo />}
          notes={[
            'Statuses live in a single Uint8Array, and rows are derived from their index, so there are no million-object arrays in memory.',
            '"Select all" is stored as all, minus exclusions, so selecting a million rows costs nothing until you act on them.',
            'One million 40px rows is taller than browsers allow for one element, so the scroll height is capped and remapped onto the real offset.',
            'Each bulk action records only the rows it changed, which is what makes undo instant.',
            'Filtering runs off a deferred value, so typing stays responsive while a million rows are scanned.',
          ]}
        >
          A take on the bulk lock pattern I worked on at Veeva. Select a few rows or all million, lock or
          freeze them, then undo. Only the rows you can see are rendered.
        </Demo>
      </div>
    </Section>
  );
}
