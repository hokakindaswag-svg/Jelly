import SectionHeading from "./ui/SectionHeading";
import Stars from "./ui/Stars";
import { reviews } from "@/lib/site";

export default function Reviews() {
  const average = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="bg-bubble-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Ils ont adopté"
          title={<>💌 Ce que disent nos clientes et clients</>}
          subtitle={`${average}/5 en moyenne sur ${reviews.length} avis publiés.`}
        />

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scroll-cute lg:grid lg:grid-cols-3 lg:overflow-visible">
          {reviews.map((r) => (
            <figure
              key={r.handle}
              className="flex w-[80%] shrink-0 snap-center flex-col gap-2 rounded-[var(--radius-cute)] bg-white p-5 shadow-[0_2px_14px_-8px_rgba(111,76,56,0.3)] sm:w-[46%] lg:w-auto"
            >
              <Stars rating={r.rating} />
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-cocoa-800">
                {r.emoji} {r.title}
              </h3>
              <blockquote className="text-sm leading-relaxed text-cocoa-600/85">
                « {r.text} »
              </blockquote>
              <figcaption className="mt-auto pt-3 text-xs font-bold text-cocoa-600/70">
                {r.name} · {r.handle}
                <span className="block font-normal text-cocoa-400">
                  Achat vérifié — {r.product}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
