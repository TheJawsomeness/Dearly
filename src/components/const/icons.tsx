import { ReactNode } from "react";

export const icons: Record<string, ReactNode> = {
  arrow: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m13.7 7.5 3 3" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  ),
  thumbDown: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v11M3 4v9a1 1 0 0 0 1 1h3l4 7h2a2 2 0 0 0 2-2l-1-5h4a2 2 0 0 0 2-2l-1-6a2 2 0 0 0-2-2H7" />
    </svg>
  ),
  thumbUp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 21V10M3 20v-9a1 1 0 0 1 1-1h3l4-7h2a2 2 0 0 1 2 2l-1 5h4a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2H7" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2M16 4a3 3 0 0 1 0 6M17 13a5 5 0 0 1 4 5v2" />
    </svg>
  ),
};
