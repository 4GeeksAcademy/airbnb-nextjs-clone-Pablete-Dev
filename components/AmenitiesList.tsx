import type { RoomAmenity } from "@/types/room";

type AmenitiesListProps = {
  amenities: RoomAmenity[];
};

const renderAmenityIcon = (icon: RoomAmenity["icon"]) => {
  const commonProps = {
    "aria-hidden": true as const,
    viewBox: "0 0 24 24",
    fill: "none",
    className: "size-6 shrink-0 text-neutral-900",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (icon === "key") {
    return (
      <svg {...commonProps}>
        <circle cx="8" cy="8" r="4" />
        <path d="m11 11 9 9m-4-4 2-2m-5-1 2-2" />
      </svg>
    );
  }

  if (icon === "pool") {
    return (
      <svg {...commonProps}>
        <path d="M4 4v12m0-8h16v8M8 8v4m4-4v4m4-4v4" />
        <path d="M3 19c1.5-1 2.5-1 4 0s2.5 1 4 0 2.5-1 4 0 2.5 1 4 0 2.5-1 4 0" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg {...commonProps}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (icon === "wifi") {
    return (
      <svg {...commonProps}>
        <path d="M3 9a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 3a4 4 0 0 1 6 0" />
        <circle cx="12" cy="18" r=".8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M4 10h16M8 7h.01M12 7h.01M16 7h.01M8 14h8v7H8z" />
    </svg>
  );
};

const AmenitiesList = ({ amenities }: AmenitiesListProps) => {
  return (
    <section aria-labelledby="amenities-heading" className="space-y-5 py-5">
      <h2 id="amenities-heading" className="text-xl font-semibold text-neutral-900">
        Lo que ofrece este lugar
      </h2>
      <ul className="space-y-5">
        {amenities.map((amenity) => (
          <li key={amenity.id} className="flex items-start gap-4">
            {renderAmenityIcon(amenity.icon)}
            <div>
              <h3 className="font-medium text-neutral-900">{amenity.title}</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{amenity.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AmenitiesList;