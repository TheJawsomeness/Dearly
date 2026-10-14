export default function MessageSkeleton() {
  return (
    <div className="message-card skeleton-card" aria-hidden="true">
      <div className="skeleton-avatar shimmer" />
      <div className="skeleton-content">
        <div className="skeleton-line short shimmer" />
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line medium shimmer" />
      </div>
    </div>
  );
}
