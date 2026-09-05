import SectionHeading from "./ui/SectionHeading";

export type InfoBlock = { title: string; body: string[] };

/**
 * Gabarit des pages d'information et pages légales.
 * Les mentions entre crochets sont à compléter avec les informations
 * réelles de l'entreprise avant mise en ligne.
 */
export default function InfoPage({
  emoji,
  title,
  intro,
  blocks,
}: {
  emoji: string;
  title: string;
  intro?: string;
  blocks: InfoBlock[];
}) {
  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading title={<>{emoji} {title}</>} subtitle={intro} />
        <div className="mt-8 flex flex-col gap-4">
          {blocks.map((block) => (
            <article
              key={block.title}
              className="rounded-[var(--radius-cute)] bg-white p-6 shadow-[0_2px_14px_-10px_rgba(111,76,56,0.4)]"
            >
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
                {block.title}
              </h2>
              {block.body.map((p, i) => (
                <p key={i} className="mt-2 text-sm leading-relaxed text-cocoa-600/85">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
