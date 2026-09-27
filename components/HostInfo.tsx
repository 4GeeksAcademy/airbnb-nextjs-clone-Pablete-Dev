import Image from "next/image";

type HostInfoProps = {
  name: string;
  avatarSrc: string;
  avatarAlt: string;
  hostingDuration: string;
};

const HostInfo = ({ name, avatarSrc, avatarAlt, hostingDuration }: HostInfoProps) => {
  return (
    <section className="flex items-center gap-4 border-b border-neutral-200 py-5">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
        <Image src={avatarSrc} alt={avatarAlt} fill sizes="64px" className="object-cover" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">Anfitrión: {name}</h2>
        <p className="mt-1 text-sm text-neutral-600">{hostingDuration}</p>
      </div>
    </section>
  );
};

export default HostInfo;