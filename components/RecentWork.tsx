import Image from "next/image";
import { BeforeAfter } from "./BeforeAfter";
import { SecHead } from "./Sections";

/**
 * Real Wave job photos (shot by the Wave team). Mosaic of field photos with
 * short captions; `size` controls how many grid cells each one spans.
 */
type Shot = {
  src: string;
  alt: string;
  cap: string;
  size?: "tall" | "wide" | "big";
  /** Before/after pair: `src`/`alt` are the before photo, these are the after photo. Renders as a drag slider. */
  after?: string;
  afterAlt?: string;
};

const shots: Shot[] = [
  { src: "/images/work/condenser-service.jpg", alt: "Wave technician servicing an outdoor AC condenser beside a Las Vegas home", cap: "AC service, side yard", size: "big" },
  { src: "/images/work/attic-tech.jpg", alt: "Wave technician working on an air handler in a Las Vegas attic", cap: "Attic air handler", size: "wide" },
  {
    src: "/images/work/plenum-attic-before.jpg",
    alt: "Torn, taped-over coil plenum in a Las Vegas attic before Wave's repair",
    after: "/images/work/plenum-attic-after.jpg",
    afterAlt: "The same attic coil plenum rebuilt by Wave with new foil-faced duct board and sealed openings",
    cap: "Attic plenum: patched and torn, then rebuilt and sealed",
    size: "big",
  },
  { src: "/images/work/new-condensers.jpg", alt: "Two new AC condensers installed on pads in a side yard", cap: "New condensers set", size: "tall" },
  { src: "/images/work/furnace-garage.jpg", alt: "New furnace and coil installed in a Las Vegas garage", cap: "Furnace install, garage", size: "tall" },
  { src: "/images/work/condenser-inside.jpg", alt: "Wave technician working inside an opened AC condenser", cap: "Inside the condenser", size: "wide" },
  { src: "/images/work/attic-furnace.jpg", alt: "Attic furnace with new flex duct and condensate piping", cap: "Attic furnace & ducts" },
  { src: "/images/work/control-board.jpg", alt: "Furnace control board checked during a repair", cap: "Control board check" },
  { src: "/images/work/fleet.jpg", alt: "Two Wave Heating & Cooling service vans parked in Las Vegas", cap: "Wave vans, on the road", size: "wide" },
];

export function RecentWork({
  kicker = "Real jobs, real photos",
  title = "Recent work around the valley",
  lead = "No stock photos. These are Wave techs on actual Las Vegas jobs: attics, side yards and garages.",
  alt = false,
}: {
  kicker?: string;
  title?: string;
  lead?: string;
  alt?: boolean;
}) {
  return (
    <section className={`sec work-sec${alt ? " sec-alt" : ""}`} id="recent-work">
      <div className="wrap">
        <SecHead kicker={kicker} title={title} lead={lead} variant="split" />
        <ul className="work-grid" data-reveal>
          {shots.map((s) => {
            const sizes =
              s.size === "big" || s.size === "wide"
                ? "(max-width: 760px) 100vw, (max-width: 1040px) 66vw, 600px"
                : "(max-width: 760px) 50vw, (max-width: 1040px) 33vw, 300px";
            return (
              <li key={s.src} className={`work-shot${s.size ? ` work-${s.size}` : ""}${s.after ? " work-ba" : ""}`}>
                {s.after ? (
                  <BeforeAfter
                    before={s.src}
                    after={s.after}
                    beforeAlt={s.alt}
                    afterAlt={s.afterAlt}
                    sizes={sizes}
                    className="work-ba-slider"
                  />
                ) : (
                  <Image src={s.src} alt={s.alt} fill sizes={sizes} />
                )}
                <span className="work-cap">{s.cap}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
