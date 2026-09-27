export type MapMarkerPosition =
  | "north-west"
  | "north"
  | "north-east"
  | "center-west"
  | "center"
  | "center-east"
  | "south-west"
  | "south"
  | "south-east";

export type MapMarker = {
  id: string;
  price: number;
  position: MapMarkerPosition;
};

type MapPlaceholderProps = {
  destination: string;
  center: {
    latitude: number;
    longitude: number;
  };
  markers: MapMarker[];
  selectedMarkerId: string | null;
  onSelectMarker: (markerId: string) => void;
};

const markerPositions: Record<MapMarkerPosition, string> = {
  "north-west": "left-[12%] top-[16%]",
  north: "left-[47%] top-[11%]",
  "north-east": "right-[10%] top-[22%]",
  "center-west": "left-[18%] top-[43%]",
  center: "left-[46%] top-[42%]",
  "center-east": "right-[13%] top-[47%]",
  "south-west": "left-[8%] bottom-[20%]",
  south: "left-[43%] bottom-[16%]",
  "south-east": "right-[9%] bottom-[21%]",
};

const MapPlaceholder = ({
  destination,
  center,
  markers,
  selectedMarkerId,
  onSelectMarker,
}: MapPlaceholderProps) => {
  const formattedPrice = (price: number) =>
    `$${new Intl.NumberFormat("es-CL").format(price)} CLP`;

  return (
    <section
      aria-label={`Mapa de alojamientos en ${destination}, centro ${center.latitude}, ${center.longitude}`}
      className="relative isolate min-h-[28rem] overflow-hidden bg-[#e7f1e9] md:sticky md:top-6 md:h-[calc(100vh-3rem)] md:min-h-[34rem] md:rounded-xl"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <rect width="720" height="900" fill="#e7f1e9" />
        <path d="M0 0h230l-30 110 85 75-45 115 68 108-52 120 80 110-25 262H0z" fill="#cae9ee" />
        <path d="M302 0h418v900H276l42-170-66-116 67-120-55-128 57-112-34-116z" fill="#edf1dc" />
        <path d="m80 92 510 156-42 74L54 170zm-54 320 614-148 18 54L43 480zm22 232 572-142 16 48L68 696zm104-672 76 10 294 782-56 19zm350 1 66 2-188 795-56-16z" fill="#fbfaf5" stroke="#d9ddd2" strokeWidth="6" />
        <path d="M215 92 172 220l90 72-67 112 80 111-65 102 82 119-38 92M506 75l-60 126 84 88-74 113 69 105-54 123 84 90-35 111" fill="none" stroke="#d0d6ca" strokeWidth="7" />
        <path d="M276 0 247 116l72 88-47 108 65 110-47 111 67 114-31 253M0 520l234-58 104 36 92-56 86 32 204-50M0 780l212-48 80 40 112-36 112 24 204-46" fill="none" stroke="#c4cdbf" strokeWidth="4" />
        <path d="M91 249h48v40H91zm61 50h43v35h-43zm271-184h54v47h-54zm143 177h41v44h-41zM77 570h49v42H77zm459 70h53v44h-53zM321 748h52v36h-52z" fill="#d5e5c9" />
        <text x="320" y="455" fill="#7b887c" fontSize="22" fontFamily="sans-serif">{destination}</text>
        <text x="81" y="584" fill="#8b9487" fontSize="20" fontFamily="sans-serif">Valparaíso</text>
        <text x="517" y="781" fill="#8b9487" fontSize="18" fontFamily="sans-serif">Quilpué</text>
      </svg>

      {markers.map((marker) => {
        const isSelected = marker.id === selectedMarkerId;

        return (
          <button
            key={marker.id}
            type="button"
            aria-pressed={isSelected}
            aria-label={`${formattedPrice(marker.price)}${isSelected ? `, seleccionado en ${destination}` : ""}`}
            onClick={() => onSelectMarker(marker.id)}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-2 text-sm font-semibold shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${markerPositions[marker.position]} ${
              isSelected
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-900"
            }`}
          >
            {formattedPrice(marker.price)}
          </button>
        );
      })}

      <div className="absolute right-4 bottom-4 hidden rounded-full bg-white/95 px-4 py-2 text-xs text-neutral-600 shadow-sm md:block">
        Mapa de referencia
      </div>
    </section>
  );
};

export default MapPlaceholder;