type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, id }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="deco-rule font-type text-xs uppercase tracking-[0.3em] sm:text-sm">
        <span className="shrink-0">{eyebrow}</span>
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl text-balance sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-mist">{intro}</p>}
    </div>
  );
}
