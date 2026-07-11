import { useEffect } from 'react';

export default function Toast({ message, action, actionLabel = 'Undo', onAction, autoClose = 5000 }) {
  useEffect(() => {
    if (!autoClose) return;
    const timer = setTimeout(() => {
      // Parent component handles removal via state
    }, autoClose);
    return () => clearTimeout(timer);
  }, [autoClose]);

  return (
    <div className="toast">
      <span className="toast-message">{message}</span>
      {action && (
        <button className="toast-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
