import Link from "next/link";

const RoomNotFound = () => {
  return (
    <main className="grid min-h-dvh place-items-center bg-white px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-neutral-900">
          No encontramos este alojamiento
        </h1>
        <p className="mt-2 text-neutral-600">Puede que ya no esté disponible.</p>
        <Link
          href="/catalog"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
};

export default RoomNotFound;