const RoomLoadingState = () => {
  return (
    <main className="min-h-dvh bg-white pb-8" aria-busy="true">
      <div role="status" aria-live="polite" className="mx-auto max-w-6xl">
        <span className="sr-only">Cargando alojamiento...</span>
        <div className="aspect-[4/3] animate-pulse bg-neutral-200 md:aspect-[16/8]" />
        <div className="space-y-5 px-6 py-8">
          <div className="h-8 w-4/5 animate-pulse rounded bg-neutral-200" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-100" />
          <div className="h-24 animate-pulse rounded-xl bg-neutral-100" />
        </div>
      </div>
    </main>
  );
};

export default RoomLoadingState;