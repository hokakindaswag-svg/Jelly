export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="rounded-full bg-bubble-100 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-bubble-600">
          {eyebrow}
        </span>
      )}
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-cocoa-800 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-cocoa-600/85 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
