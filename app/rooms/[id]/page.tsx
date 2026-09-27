"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AmenitiesList from "@/components/AmenitiesList";
import BookingCard from "@/components/BookingCard";
import HostInfo from "@/components/HostInfo";
import PhotoGallery from "@/components/PhotoGallery";
import PropertyHeader from "@/components/PropertyHeader";
import RoomLoadingState from "@/components/RoomLoadingState";
import RoomNotFound from "@/components/RoomNotFound";
import type { RoomDetails } from "@/types/room";

const createRoomImage = (wall: string, upholstery: string, view: string, alt: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${wall}"/>
          <stop offset="1" stop-color="#eee9e1"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#wall)"/>
      <rect x="84" y="88" width="442" height="386" rx="8" fill="${view}"/>
      <path d="M305 88v386M84 282h442" stroke="#f5f2eb" stroke-width="19"/>
      <path d="M42 485h1116v315H42z" fill="#92765f"/>
      <path d="M80 542h1040M80 620h1040M80 698h1040" stroke="#b4987d" stroke-width="8"/>
      <rect x="591" y="352" width="481" height="252" rx="42" fill="${upholstery}"/>
      <rect x="557" y="521" width="548" height="88" rx="28" fill="#a87557"/>
      <rect x="648" y="314" width="163" height="122" rx="23" fill="#e8ddd0"/>
      <rect x="828" y="314" width="163" height="122" rx="23" fill="#e8ddd0"/>
      <rect x="950" y="208" width="142" height="236" rx="10" fill="#bd3029"/>
      <rect x="965" y="224" width="112" height="35" rx="5" fill="#e8e2d6"/>
      <circle cx="1071" cy="389" r="7" fill="#eadbcb"/>
      <path d="M70 470h1072" stroke="#645647" stroke-width="12"/>
      <text x="80" y="750" fill="#ffffff" font-size="26" font-family="sans-serif" opacity=".8">${alt}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const hostAvatar = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" rx="64" fill="#e8e8e8"/>
    <circle cx="64" cy="45" r="22" fill="#c98d68"/>
    <path d="M22 122c3-28 19-44 42-44s39 16 42 44" fill="#5f8490"/>
    <path d="M43 43c2-17 13-26 25-24 10 1 17 9 18 21-8-4-17-7-27-6-6 0-11 4-16 9Z" fill="#34302e"/>
  </svg>
`)}`;

const room: RoomDetails = {
  id: "vina-mar-pool",
  title: "Moderno dpto estudio, linda vista y ubicación.",
  propertyType: "Alojamiento entero",
  location: "vivienda rentada en Concón, Chile",
  guests: 2,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.89,
  reviewCount: 9,
  badge: "Favorito entre huéspedes",
  host: {
    name: "Wilson",
    avatarSrc: hostAvatar,
    avatarAlt: "Retrato del anfitrión Wilson",
    hostingDuration: "2 meses anfitrionando",
  },
  images: [
    {
      src: createRoomImage("#d8d4cd", "#d7c8b7", "#b7d3d1", "Sala de estar"),
      alt: "Sala luminosa del departamento estudio",
    },
    {
      src: createRoomImage("#c8c0b4", "#788d91", "#9abdc0", "Vista desde el estudio"),
      alt: "Ventana amplia con vista desde el alojamiento",
    },
    {
      src: createRoomImage("#e1d8ca", "#9b8068", "#aec9c1", "Espacio de descanso"),
      alt: "Espacio de descanso del departamento",
    },
    {
      src: createRoomImage("#cfcac2", "#a58d79", "#91b8bf", "Interior del alojamiento"),
      alt: "Interior amueblado del departamento en Concón",
    },
  ],
  amenities: [
    {
      id: "check-in",
      icon: "key",
      title: "Experiencia de check-in excepcional",
      description: "Los huéspedes recientes valoraron con 5 estrellas el proceso de check-in.",
    },
    {
      id: "pool",
      icon: "pool",
      title: "Sumérgete",
      description: "Este es uno de los pocos lugares en la zona con piscina.",
    },
    {
      id: "location",
      icon: "location",
      title: "Zona pintoresca",
      description: "El alojamiento está en una zona con vistas y lugares para recorrer.",
    },
    {
      id: "wifi",
      icon: "wifi",
      title: "Wifi",
      description: "Conexión disponible durante toda tu estancia.",
    },
    {
      id: "kitchen",
      icon: "kitchen",
      title: "Cocina",
      description: "Prepara tus comidas en un espacio equipado.",
    },
  ],
  booking: {
    currentPrice: 200190,
    previousPrice: 277415,
    nights: 5,
    dates: "27 de sept – 2 de oct",
    minimumGuests: 1,
    maximumGuests: 2,
  },
};

const mockRooms: Record<string, RoomDetails> = {
  [room.id]: room,
};

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loadedRoom, setLoadedRoom] = useState<RoomDetails | null>(null);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoadedRoom(mockRooms[id] ?? null);
      setResolvedId(id);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [id]);

  const isLoading = resolvedId !== id;

  if (isLoading) {
    return <RoomLoadingState />;
  }

  if (!loadedRoom) {
    return <RoomNotFound />;
  }

  return (
    <main className="min-h-dvh bg-white pb-[25rem] text-neutral-900 md:pb-12">
      <div className="relative mx-auto max-w-7xl">
        <PhotoGallery images={loadedRoom.images} />
        <Link
          href="/catalog"
          aria-label="Volver al catálogo"
          className="absolute top-4 left-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
            <path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-7 md:grid-cols-[minmax(0,1fr)_22rem] md:gap-12 md:px-10 md:py-10">
        <div className="min-w-0">
          <PropertyHeader
            title={loadedRoom.title}
            propertyType={loadedRoom.propertyType}
            location={loadedRoom.location}
            guests={loadedRoom.guests}
            bedrooms={loadedRoom.bedrooms}
            beds={loadedRoom.beds}
            bathrooms={loadedRoom.bathrooms}
            rating={loadedRoom.rating}
            reviewCount={loadedRoom.reviewCount}
            badge={loadedRoom.badge}
          />

          <HostInfo {...loadedRoom.host} />
          <AmenitiesList amenities={loadedRoom.amenities} />

          <section id="reviews" className="border-t border-neutral-200 py-6">
            <h2 className="text-xl font-semibold text-neutral-900">Reseñas de huéspedes</h2>
            <p className="mt-2 text-sm text-neutral-600">
              {loadedRoom.rating.toFixed(2)} de 5 · {loadedRoom.reviewCount} reseñas
            </p>
          </section>
        </div>

        <BookingCard
          currentPrice={loadedRoom.booking.currentPrice}
          previousPrice={loadedRoom.booking.previousPrice}
          nights={loadedRoom.booking.nights}
          dates={loadedRoom.booking.dates}
          initialGuests={loadedRoom.guests}
          minimumGuests={loadedRoom.booking.minimumGuests}
          maximumGuests={loadedRoom.booking.maximumGuests}
        />
      </div>
    </main>
  );
};

export default RoomPage;