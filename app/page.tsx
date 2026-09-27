"use client";

import { useEffect, useState, type FormEvent } from "react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import CategoryFilter, { type ListingCategory } from "@/components/CategoryFilter";
import HorizontalListingRow from "@/components/HorizontalListingRow";
import PriceNotice from "@/components/PriceNotice";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import type { Listing } from "@/types/listing";

type ListingScene = "pool" | "tower" | "coast" | "interior";

type HomeSection = {
  id: string;
  title: string;
  categoryId: string;
  listings: Listing[];
};

const createListingImage = (
  scene: ListingScene,
  skyColor: string,
  facadeColor: string,
) => {
  const sceneDetails: Record<ListingScene, string> = {
    pool: `
      <rect x="72" y="334" width="496" height="160" rx="12" fill="#36B9C8"/>
      <path d="M72 365h496M72 408h496M180 334v160M310 334v160M440 334v160" stroke="#D5FBFF" stroke-opacity=".55" stroke-width="5"/>
      <rect x="42" y="496" width="556" height="26" fill="#E4D6C1"/>
      <path d="M42 532h556v108H42z" fill="#B99F83"/>
      <path d="M74 558h492M74 592h492" stroke="#D8C2A5" stroke-width="4"/>
      <rect x="112" y="470" width="64" height="32" rx="8" fill="#56636A"/>
      <rect x="462" y="470" width="64" height="32" rx="8" fill="#56636A"/>
    `,
    tower: `
      <rect x="340" y="110" width="205" height="428" rx="5" fill="${facadeColor}"/>
      <path d="M366 145h153M366 205h153M366 265h153M366 325h153M366 385h153M366 445h153" stroke="#D9E5E8" stroke-opacity=".7" stroke-width="7"/>
      <path d="M390 130v380M445 130v380M500 130v380" stroke="#C6D7DC" stroke-opacity=".55" stroke-width="5"/>
      <rect x="0" y="500" width="640" height="140" fill="#536B64"/>
      <path d="M0 538h640" stroke="#D5D7C9" stroke-width="7"/>
      <path d="M75 500v-115m0 0-24 37m24-37 23 37" stroke="#6C7772" stroke-width="7"/>
      <circle cx="76" cy="370" r="12" fill="#F8D79B"/>
    `,
    coast: `
      <path d="M0 352c98-26 154 30 245 5s151-17 232 0 122 0 163-14v297H0z" fill="#287D91"/>
      <path d="M0 407c103-22 172 24 268 3s164-11 238 5 97 5 134-5" fill="none" stroke="#9BD5D9" stroke-width="12"/>
      <path d="M0 490h640v150H0z" fill="#D5C2A6"/>
      <path d="M0 521h640M0 568h640M0 615h640" stroke="#EBDCC7" stroke-width="5"/>
      <rect x="392" y="150" width="150" height="326" fill="${facadeColor}"/>
      <path d="M410 180h112M410 235h112M410 290h112M410 345h112M410 400h112" stroke="#E6E8E2" stroke-opacity=".7" stroke-width="8"/>
    `,
    interior: `
      <rect x="54" y="112" width="268" height="280" rx="8" fill="#B9D9D8"/>
      <path d="M188 112v280M54 260h268" stroke="#F7F4EC" stroke-width="12"/>
      <path d="M54 398h268" stroke="#7F614D" stroke-width="18"/>
      <rect x="336" y="300" width="250" height="206" rx="28" fill="${facadeColor}"/>
      <rect x="312" y="454" width="282" height="72" rx="24" fill="#B48769"/>
      <rect x="365" y="278" width="92" height="76" rx="14" fill="#E9D7C7"/>
      <rect x="465" y="278" width="92" height="76" rx="14" fill="#E9D7C7"/>
      <path d="M0 526h640v114H0z" fill="#A7896A"/>
      <path d="M20 566h600M20 610h600" stroke="#CBB292" stroke-width="5"/>
    `,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${skyColor}"/>
          <stop offset="1" stop-color="#F2E9DC"/>
        </linearGradient>
        <linearGradient id="building" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${facadeColor}"/>
          <stop offset="1" stop-color="#445660"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" fill="url(#sky)"/>
      <circle cx="508" cy="112" r="48" fill="#F8DCA6" opacity=".86"/>
      <path d="M0 326 118 238l92 75 108-122 128 112 88-68 106 79v98H0z" fill="#9DAEAA" opacity=".48"/>
      <rect x="94" y="178" width="206" height="332" rx="4" fill="url(#building)"/>
      <path d="M116 210h162M116 266h162M116 322h162M116 378h162M116 434h162" stroke="#DDE4E3" stroke-opacity=".72" stroke-width="7"/>
      <path d="M147 196v294M202 196v294M257 196v294" stroke="#C4D0CF" stroke-opacity=".54" stroke-width="5"/>
      ${sceneDetails[scene]}
      <path d="M32 512h576" stroke="#29383D" stroke-opacity=".42" stroke-width="8"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const listings: Listing[] = [
  {
    id: "vina-pool-apartment",
    imageSrc: createListingImage("pool", "#9BCAD7", "#55666B"),
    imageAlt: "Terraza con piscina en un edificio de Viña del Mar",
    title: "Apartamento en Viña del Mar",
    badge: "Favorito entre huéspedes",
    price: 160710,
    currency: "CLP",
    nights: 2,
    rating: 5,
  },
  {
    id: "vina-tower-apartment",
    imageSrc: createListingImage("tower", "#8398A3", "#394A55"),
    imageAlt: "Edificio residencial moderno en Viña del Mar",
    title: "Apartamento en Viña del Mar",
    badge: "Favorito entre huéspedes",
    price: 217100,
    currency: "CLP",
    nights: 2,
    rating: 4.8,
  },
  {
    id: "vina-coast-apartment",
    imageSrc: createListingImage("coast", "#D1B9A2", "#725D52"),
    imageAlt: "Alojamiento con vista a la costa de Viña del Mar",
    title: "Departamento frente al mar",
    price: 184500,
    currency: "CLP",
    nights: 2,
    rating: 4.9,
  },
  {
    id: "la-serena-coast-apartment",
    imageSrc: createListingImage("coast", "#A9C6C4", "#6E6258"),
    imageAlt: "Terraza de alojamiento cerca de la costa de La Serena",
    title: "Departamento en La Serena",
    badge: "Favorito entre huéspedes",
    price: 112300,
    currency: "CLP",
    nights: 2,
    rating: 4.9,
  },
  {
    id: "la-serena-tower-apartment",
    imageSrc: createListingImage("tower", "#C3B9A8", "#69594F"),
    imageAlt: "Edificio de apartamentos en La Serena al atardecer",
    title: "Apartamento cerca de la playa",
    price: 139800,
    currency: "CLP",
    nights: 2,
    rating: 4.8,
  },
  {
    id: "la-serena-interior-apartment",
    imageSrc: createListingImage("interior", "#A4C5C1", "#668178"),
    imageAlt: "Sala luminosa de un apartamento en La Serena",
    title: "Alojamiento luminoso en La Serena",
    price: 128400,
    currency: "CLP",
    nights: 2,
    rating: 5,
  },
];

const homeSections: HomeSection[] = [
  {
    id: "vina",
    title: "Alojamientos populares en Viña del Mar",
    categoryId: "stays",
    listings: listings.slice(0, 3),
  },
  {
    id: "la-serena",
    title: "Disponibles cerca de La Serena el próximo fin de semana",
    categoryId: "stays",
    listings: listings.slice(3),
  },
];

const categories: ListingCategory[] = [
  { id: "all", label: "Todo", icon: "🌐" },
  { id: "stays", label: "Alojamientos", icon: "🏠" },
  { id: "experiences", label: "Experiencias", icon: "🎈" },
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
        <path
          d="M20.8 8.9c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Iniciar sesión",
    href: "/login",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4.5 20a7.5 7.5 0 0 1 15 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedSearchTerm(searchTerm.trim());
    setIsSearchOpen(false);
  };

  const handleFavoriteChange = (listingId: string, isFavorite: boolean) => {
    setFavoriteIds((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);
      if (isFavorite) nextFavorites.add(listingId);
      else nextFavorites.delete(listingId);
      return nextFavorites;
    });
  };

  const visibleSections = homeSections
    .filter(
      (section) =>
        selectedCategoryId === "all" || section.categoryId === selectedCategoryId,
    )
    .map((section) => {
      const normalizedSearch = appliedSearchTerm.toLocaleLowerCase("es");
      return {
        ...section,
        listings: section.listings.filter((listing) => {
          if (!normalizedSearch) return true;
          return `${listing.title} ${section.title}`
            .toLocaleLowerCase("es")
            .includes(normalizedSearch);
        }),
      };
    })
    .filter((section) => section.listings.length > 0);

  const scrollToNextListings = (sectionId: string) => {
    const row = document.querySelector<HTMLElement>(`#home-row-${sectionId} [aria-label]`);
    row?.scrollBy({ left: row.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <main className="min-h-dvh bg-white pb-36 text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 pt-5 md:px-8 md:pt-8">
        <header className="mx-auto max-w-2xl">
          <SearchBar
            label={appliedSearchTerm || "Empieza la búsqueda"}
            onSearch={() => setIsSearchOpen((isOpen) => !isOpen)}
          />
          {isSearchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="mt-3 flex gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm"
            >
              <input
                autoFocus
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="¿A dónde vas?"
                aria-label="Buscar destino o alojamiento"
                className="min-w-0 flex-1 rounded-xl px-3 text-sm outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-rose-500"
              />
              <button
                type="submit"
                className="min-h-11 rounded-full bg-rose-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
              >
                Buscar
              </button>
            </form>
          )}
        </header>

        <div className="mt-5 md:mt-7">
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </div>

        <div className="mt-7 space-y-9 pb-8 md:mt-10 md:space-y-12">
          {isLoading ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-20 items-center justify-center gap-3 rounded-2xl bg-neutral-50 px-5 text-sm text-neutral-600"
            >
              <span className="size-5 animate-spin rounded-full border-2 border-neutral-300 border-t-rose-600" />
              <span>Cargando alojamientos...</span>
            </div>
          ) : visibleSections.length > 0 ? (
            visibleSections.map((section) => (
              <section key={section.id} className="space-y-4 md:space-y-5">
                <SectionHeader
                  title={section.title}
                  onNext={() => scrollToNextListings(section.id)}
                />
                <div id={`home-row-${section.id}`}>
                  <HorizontalListingRow
                    label={section.title}
                    listings={section.listings}
                    favoriteIds={favoriteIds}
                    onFavoriteChange={handleFavoriteChange}
                  />
                </div>
              </section>
            ))
          ) : (
            <p className="rounded-2xl bg-neutral-50 px-5 py-8 text-center text-sm text-neutral-600">
              {selectedCategoryId === "experiences"
                ? "Todavía no hay experiencias disponibles."
                : "No encontramos alojamientos con esos criterios."}
            </p>
          )}
        </div>
      </div>

      <PriceNotice message="Los precios incluyen todas las tarifas" />
      <BottomNav items={navigationItems} activeHref="/" />
    </main>
  );
};

export default Home;
