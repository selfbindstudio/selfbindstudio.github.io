import { useState } from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 34, className = '' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        style={{ width: size, height: size }}
        className={`inline-flex items-center justify-center rounded-lg bg-black border border-[var(--sb-border-strong)] shrink-0 ${className}`}
        aria-hidden="true"
      >
        <svg
          width={Math.round(size * 0.62)}
          height={Math.round(size * 0.62)}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.75L5 5.6V11.4C5 16.05 7.98 20.17 12 21.5C16.02 20.17 19 16.05 19 11.4V5.6L12 2.75Z"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <rect
            x="9.25"
            y="11"
            width="5.5"
            height="4.5"
            rx="1"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path
            d="M10.5 11V9.4C10.5 8.57 11.17 7.9 12 7.9C12.83 7.9 13.5 8.57 13.5 9.4V11"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <img
      src="./logo.png"
      alt="SelfBind emblem"
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className={`rounded-lg object-cover bg-black border border-[var(--sb-border-strong)] shrink-0 ${className}`}
    />
  );
}

export function GooglePlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.522 1.522 0 0 1-.61-1.22V3.034c0-.508.248-.955.609-1.22zm11.24 11.24l2.742 2.742-11.16 6.382 8.418-9.124zm3.76-3.76l2.435 1.392c.858.49.858 1.738 0 2.228l-2.435 1.392-3.01-3.006 3.01-3.006zM6.43 1.822l11.16 6.382-2.742 2.742-8.418-9.124z" />
    </svg>
  );
}
