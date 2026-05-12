import React from 'react';

export const EvnLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#164399" />
    <path d="M25 35 H75 V45 H40 V50 H70 V60 H40 V65 H75 V75 H25 Z" fill="white" />
    <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2" />
  </svg>
);

export const CSKH_ICON = "https://picsum.photos/seed/support/200/200"; // Placeholder for offline-ready if needed, but for now using picsum with no-referrer
