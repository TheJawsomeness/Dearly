export default function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Dearly home">
      <span className="logo-mark">
        <svg className="dearly-mark" viewBox="0 0 40 40" aria-hidden="true">
          <path
            className="dearly-paper"
            d="M10.5 6.5h12.8l6.2 6.2v20.8h-19a2 2 0 0 1-2-2v-23a2 2 0 0 1 2-2Z"
          />
          <path className="dearly-fold" d="M23.3 6.5v6.2h6.2" />
          <path
            className="dearly-writing"
            d="M13.5 18h11.8M13.5 22.5h11.8M13.5 27h7.6"
          />
        </svg>
      </span>
      <span>Dearly</span>
    </button>
  );
}
