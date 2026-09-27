import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/types/listing";

type HorizontalListingRowProps = {
  label: string;
  listings: Listing[];
  favoriteIds?: ReadonlySet<string>;
  onFavoriteChange?: (listingId: string, isFavorite: boolean) => void;
};

const HorizontalListingRow = ({
  label,
  listings,
  favoriteIds,
  onFavoriteChange,
}: HorizontalListingRowProps) => {
  return (
    <div
      aria-label={label}
      className="flex gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {listings.map((listing) => (
        <div key={listing.id} className="w-[42vw] min-w-36 max-w-48 shrink-0 sm:max-w-60">
          <ListingCard
            listing={listing}
            isFavorite={favoriteIds?.has(listing.id) ?? false}
            onFavoriteChange={onFavoriteChange}
          />
        </div>
      ))}
    </div>
  );
};

export default HorizontalListingRow;