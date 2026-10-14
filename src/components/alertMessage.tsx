import { useEffect } from "react";

type AlertVariant = "success" | "danger" | "warning" | "info";

type StatusAlertProps = {
  message: string;
  variant?: AlertVariant;
  onClose: () => void;
};

function AlertMessage({
  message,
  onClose,
  variant = "info",
}: StatusAlertProps) {
  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="container pt-2">
      <div
        className={`alert alert-${variant} alert-dismissible shadow-sm`}
        role="status"
      >
        {message}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default AlertMessage;
