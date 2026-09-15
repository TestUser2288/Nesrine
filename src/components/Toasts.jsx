import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Check } from './icons';

const ToastContext = createContext(() => {});

export function useToast() {
  return useContext(ToastContext);
}

/** File de notifications éphémères, empilées en bas de l'écran. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const push = useCallback((message) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, message }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2600);
  }, []);

  const value = useMemo(() => push, [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id}>
            <Check width="16" height="16" />
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
