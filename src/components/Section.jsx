export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
