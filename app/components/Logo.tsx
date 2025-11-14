export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M8 7L4 12L8 17"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 7L20 12L16 17"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 4L10 20"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
