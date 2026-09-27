type PriceNoticeProps = {
  message: string;
  isVisible?: boolean;
};

const PriceNotice = ({ message, isVisible = true }: PriceNoticeProps) => {
  if (!isVisible) return null;

  return (
    <aside
      role="status"
      className="fixed inset-x-4 bottom-24 z-40 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm text-neutral-900 shadow-[0_2px_16px_rgba(0,0,0,0.18)] sm:px-6"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-7 shrink-0 text-rose-500"
      >
        <path
          d="M3.5 7.5h12l5 4.5-5 4.5h-12V7.5Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="7.5" cy="12" r="1" fill="white" />
      </svg>
      <span>{message}</span>
    </aside>
  );
};

export default PriceNotice;