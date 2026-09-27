"use client";

import { useState, type FormEvent } from "react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import CatalogHeader from "@/components/CatalogHeader";
import FilterChips, { type CatalogFilter } from "@/components/FilterChips";
import ListingCard from "@/components/ListingCard";
import MapPlaceholder, {
  type MapMarker,
  type MapMarkerPosition,
} from "@/components/MapPlaceholder";
import PriceNotice from "@/components/PriceNotice";
import ResultsHeader from "@/components/ResultsHeader";
import SortControl, { type PriceSortOrder } from "@/components/SortControl";
import type { Listing } from "@/types/listing";

type CatalogListing = Listing & {
  location: string;
  filterIds: string[];
  markerPosition: MapMarkerPosition;
};

const makeListingImage = (sky: string, facade: string, detail: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${sky}"/>
          <stop offset="1" stop-color="#f2e9dc"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" fill="url(#sky)"/>
      <circle cx="508" cy="112" r="47" fill="#f8dca6" opacity=".9"/>
      <path d="M0 316 138 205l94 85 112-128 131 116 87-67 78 66v323H0z" fill="#879d99" opacity=".55"/>
      <rect x="85" y="220" width="255" height="310" rx="8" fill="${facade}"/>
      <path d="M110 257h205M110 318h205M110 379h205M110 440h205" stroke="#f5f0e8" stroke-opacity=".72" stroke-width="9"/>
      <path d="M160 237v274M233 237v274M306 237v274" stroke="#c4d1cf" stroke-opacity=".7" stroke-width="6"/>
      <path d="M352 379h288v151H352z" fill="${detail}"/>
      <path d="M362 399h268M362 443h268M362 487h268" stroke="#f4eee5" stroke-opacity=".5" stroke-width="5"/>
      <path d="M0 532h640v108H0z" fill="#b79d7f"/>
      <path d="M28 565h584M28 603h584" stroke="#d9c4a7" stroke-width="5"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const catalogListings: CatalogListing[] = [
  {
    id: "vina-mar-pool",
    imageSrc: makeListingImage("#93c5d4", "#596d70", "#38b7c5"),
    imageAlt: "Terraza y piscina en un alojamiento de Viña del Mar",
    title: "Apartamento con piscina cerca del mar",
    badge: "Favorito entre huéspedes",
    price: 160710,
    currency: "CLP",
    nights: 2,
    rating: 5,
    location: "Viña del Mar",
    filterIds: ["pets", "parking"],
    markerPosition: "north-west",
  },
  {
    id: "vina-mar-tower",
    imageSrc: makeListingImage("#aebbc0", "#41535d", "#677b7c"),
    imageAlt: "Edificio residencial contemporáneo en Viña del Mar",
    title: "Departamento luminoso con vista a la ciudad",
    badge: "Favorito entre huéspedes",
    price: 217100,
    currency: "CLP",
    nights: 2,
    rating: 4.8,
    location: "Viña del Mar",
    filterIds: ["parking", "washer"],
    markerPosition: "north-east",
  },
  {
    id: "vina-mar-seaside",
    imageSrc: makeListingImage("#d2bca4", "#78685b", "#2c7d91"),
    imageAlt: "Alojamiento costero con vista al océano",
    title: "Estudio frente a la playa",
    price: 142717,
    currency: "CLP",
    nights: 2,
    rating: 4.9,
    location: "Viña del Mar",
    filterIds: ["pets"],
    markerPosition: "center-west",
  },
  {
    id: "vina-mar-garden",
    imageSrc: makeListingImage("#a8c7c0", "#67766c", "#9c8065"),
    imageAlt: "Casa con terraza y jardín en Viña del Mar",
    title: "Casa tranquila con terraza privada",
    price: 201000,
    currency: "CLP",
    nights: 2,
    rating: 4.7,
    location: "Viña del Mar",
    filterIds: ["pets", "washer"],
    markerPosition: "center-east",
  },
  {
    id: "vina-mar-center",
    imageSrc: makeListingImage("#c5c3b4", "#62574d", "#b38d69"),
    imageAlt: "Apartamento acogedor en el centro de Viña del Mar",
    title: "Apartamento céntrico y acogedor",
    price: 234644,
    currency: "CLP",
    nights: 2,
    rating: 4.9,
    location: "Viña del Mar",
    filterIds: ["parking", "washer"],
    markerPosition: "south-west",
  },
  {
    id: "vina-mar-coast-view",
    imageSrc: makeListingImage("#94b6c2", "#4d6269", "#397c8d"),
    imageAlt: "Edificio de apartamentos con vista a la costa",
    title: "Loft con vista panorámica al mar",
    price: 211025,
    currency: "CLP",
    nights: 2,
    rating: 4.8,
    location: "Viña del Mar",
    filterIds: ["pets", "parking", "washer"],
    markerPosition: "south-east",
  },
];

const catalogFilters: CatalogFilter[] = [
  { id: "pets", label: "Se permiten mascotas" },
  { id: "parking", label: "Estacionamiento gratuito" },
  { id: "washer", label: "Lavadora" },
];

const navigationItems: BottomNavItem[] = [
  {
    label: "Explora",
    href: "/",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Favoritos",
    href: "/catalog?filter=favorites",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
        <path d="M20.8 8.9c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Iniciar sesión",
    href: "/",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");

const CatalogPage = () => {
  const [sortOrder, setSortOrder] = useState<PriceSortOrder>("asc");
  const [selectedFilterIds, setSelectedFilterIds] = useState<Set<string>>(() => new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [destination, setDestination] = useState("Viña del Mar");
  const [dates, setDates] = useState("27 de sept – 2 de oct");
  const [guests, setGuests] = useState("2 huéspedes");
  const [draftDestination, setDraftDestination] = useState(destination);
  const [draftDates, setDraftDates] = useState(dates);
  const [draftGuests, setDraftGuests] = useState(guests);
  const [isSearchEditorOpen, setIsSearchEditorOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [maximumPrice, setMaximumPrice] = useState(500000);

  const matchingListings = catalogListings.filter((listing) => {
    const matchesDestination = normalizeText(listing.location).includes(normalizeText(destination));
    const matchesFilters = [...selectedFilterIds].every((filterId) =>
      listing.filterIds.includes(filterId),
    );

    return matchesDestination && matchesFilters && listing.price <= maximumPrice;
  });

  const sortedListings = [...matchingListings].sort((firstListing, secondListing) =>
    sortOrder === "asc"
      ? firstListing.price - secondListing.price
      : secondListing.price - firstListing.price,
  );

  const mapMarkers: MapMarker[] = sortedListings.map((listing) => ({
    id: listing.id,
    price: listing.price,
    position: listing.markerPosition,
  }));

  const toggleFilter = (filterId: string) => {
    setSelectedFilterIds((currentFilterIds) => {
      const nextFilterIds = new Set(currentFilterIds);
      if (nextFilterIds.has(filterId)) nextFilterIds.delete(filterId);
      else nextFilterIds.add(filterId);
      return nextFilterIds;
    });
  };

  const updateFavorite = (listingId: string, isFavorite: boolean) => {
    setFavoriteIds((currentFavoriteIds) => {
      const nextFavoriteIds = new Set(currentFavoriteIds);
      if (isFavorite) nextFavoriteIds.add(listingId);
      else nextFavoriteIds.delete(listingId);
      return nextFavoriteIds;
    });
  };

  const applySearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDestination(draftDestination.trim() || "Viña del Mar");
    setDates(draftDates.trim() || "Fechas flexibles");
    setGuests(draftGuests.trim() || "2 huéspedes");
    setIsSearchEditorOpen(false);
  };

  const resetMaximumPrice = () => setMaximumPrice(500000);

  return (
    <main className="min-h-dvh bg-white pb-36 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <CatalogHeader
          destination={destination}
          dates={dates}
          guests={guests}
          onEditSearch={() => {
            setDraftDestination(destination);
            setDraftDates(dates);
            setDraftGuests(guests);
            setIsSearchEditorOpen((isOpen) => !isOpen);
          }}
          onOpenFilters={() => setIsFilterPanelOpen((isOpen) => !isOpen)}
        />

        {isSearchEditorOpen && (
          <form
            onSubmit={applySearch}
            className="mx-5 mt-4 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg sm:mx-8 sm:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <label className="grid gap-1 text-xs font-medium text-neutral-600">
              Destino
              <input
                value={draftDestination}
                onChange={(event) => setDraftDestination(event.target.value)}
                className="min-h-10 rounded-lg border border-neutral-300 px-3 text-sm text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium text-neutral-600">
              Fechas
              <input
                value={draftDates}
                onChange={(event) => setDraftDates(event.target.value)}
                className="min-h-10 rounded-lg border border-neutral-300 px-3 text-sm text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium text-neutral-600">
              Huéspedes
              <input
                value={draftGuests}
                onChange={(event) => setDraftGuests(event.target.value)}
                className="min-h-10 rounded-lg border border-neutral-300 px-3 text-sm text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              />
            </label>
            <button
              type="submit"
              className="min-h-10 self-end rounded-full bg-rose-600 px-5 text-sm font-semibold text-white hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
            >
              Aplicar
            </button>
          </form>
        )}

        <div className="mt-4 px-5 sm:px-8">
          <FilterChips
            filters={catalogFilters}
            selectedFilterIds={selectedFilterIds}
            onToggleFilter={toggleFilter}
          />
        </div>

        {isFilterPanelOpen && (
          <div className="mx-5 mt-2 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-md sm:mx-8 sm:max-w-md">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="maximum-price" className="text-sm font-semibold text-neutral-900">
                Precio máximo por estancia
              </label>
              <button
                type="button"
                onClick={resetMaximumPrice}
                className="text-xs font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
              >
                Restablecer
              </button>
            </div>
            <input
              id="maximum-price"
              type="range"
              min="100000"
              max="500000"
              step="10000"
              value={maximumPrice}
              onChange={(event) => setMaximumPrice(Number(event.target.value))}
              className="w-full accent-rose-600"
            />
            <output htmlFor="maximum-price" className="text-sm text-neutral-700">
              Hasta ${new Intl.NumberFormat("es-CL").format(maximumPrice)} CLP
            </output>
          </div>
        )}

        <div className="mt-6 grid gap-8 px-5 pb-8 sm:px-8 md:mt-8 md:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] md:gap-7">
          <section aria-label="Resultados de búsqueda" className="min-w-0">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <ResultsHeader destination={destination} resultCount={sortedListings.length} />
              <SortControl value={sortOrder} onChange={setSortOrder} />
            </div>

            {sortedListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:gap-x-5">
                {sortedListings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`min-w-0 rounded-2xl transition-shadow ${
                      listing.id === selectedMarkerId ? "ring-2 ring-rose-500 ring-offset-2" : ""
                    }`}
                  >
                    <ListingCard
                      listing={listing}
                      isFavorite={favoriteIds.has(listing.id)}
                      onFavoriteChange={updateFavorite}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-neutral-50 px-5 py-10 text-center">
                <p className="font-semibold text-neutral-900">No encontramos alojamientos</p>
                <p className="mt-2 text-sm text-neutral-600">
                  Prueba con otro destino o ajusta tus filtros.
                </p>
              </div>
            )}
          </section>

          <MapPlaceholder
            destination={destination}
            center={{ latitude: -33.0245, longitude: -71.5518 }}
            markers={mapMarkers}
            selectedMarkerId={selectedMarkerId}
            onSelectMarker={setSelectedMarkerId}
          />
        </div>
      </div>

      <PriceNotice message="Los precios incluyen todas las tarifas" />
      <BottomNav items={navigationItems} activeHref="/catalog" />
    </main>
  );
};

export default CatalogPage;