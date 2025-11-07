import React, { useEffect } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeToast } from '../../store/uiSlice';
import './Toast.scss';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const dispatch = useAppDispatch();

  return (
    <RadixToast.Provider swipeDirection="right">
      {children}
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => dispatch(removeToast(toast.id))} />
      ))}
      <RadixToast.Viewport className="toast-viewport" />
    </RadixToast.Provider>
  );
};

interface ToastItemProps {
  toast: {
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <RadixToast.Root className={`toast toast--${toast.type}`} onOpenChange={(open) => !open && onClose()}>
      <RadixToast.Title className="toast__title">{toast.title}</RadixToast.Title>
      {toast.description && <RadixToast.Description className="toast__description">{toast.description}</RadixToast.Description>}
      <RadixToast.Close className="toast__close" aria-label="Close">
        <span aria-hidden="true">×</span>
      </RadixToast.Close>
    </RadixToast.Root>
  );
};

