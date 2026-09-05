import { announcements } from "@/lib/site";

/** Bandeau défilant : prix, rareté et réassurance dès le premier pixel. */
export default function AnnouncementBar() {
  const items = [...announcements, ...announcements];
  return (
    <div className="overflow-hidden bg-cocoa-800 py-2 text-white">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-4">
        {items.map((text, i) => (
          <span key={i} className="text-[11px] font-bold tracking-wide sm:text-xs">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
