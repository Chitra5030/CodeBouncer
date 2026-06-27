export default function BouncerLogo({ size = 36 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className="bouncer-logo"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3ddc97" />
          <stop offset="100%" stopColor="#5b8bff" />
        </linearGradient>
      </defs>

      {/* App-icon tile */}
      <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#cb-grad)" />

      {/* Shield (protection) */}
      <path
        d="M24 11l11 4v7c0 7-4.6 11.7-11 14.5C17.6 33.7 13 29 13 22v-7z"
        fill="none"
        stroke="#0b1020"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Check (verified) */}
      <path
        d="M19 23.5l3.5 3.5L29.5 20"
        fill="none"
        stroke="#0b1020"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
