export default function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Dearly home">
      <span className="logo-mark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 40" fill="none">
          <path
            d="M8.5 16.2h7.2L30 8.6v22.8l-14.3-7.6H8.5a2 2 0 0 1-2-2v-3.6a2 2 0 0 1 2-2Z"
            fill="#FFF5E8"
          />
          <path
            d="M15.7 16.2v7.6M30 9.7v20.6"
            stroke="#FFF5E8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="m13 24.1 2.9 8.2a1.5 1.5 0 0 0 1.4 1h3.5l-3.1-8.2"
            fill="#FFF5E8"
            stroke="#B94F40"
            stroke-linejoin="round"
          />
          <path
            d="M35 13.5 39 10M35.8 20H42M35 26.5l4 3.5"
            stroke="#FFF5E8"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M10 18.9h4.6"
            stroke="#FFF5E8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <span>Dearly</span>
    </button>
  );
}
