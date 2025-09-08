import { toast } from 'react-hot-toast';

// Notification utilities
export const showError = (message: string) => {
  toast.error(message, { position: 'top-center' });
};

export const showSuccess = (message: string) => {
  toast.success(message, { position: 'top-center' });
};

export const showWarning = (message: string) => {
  toast(message, { 
    position: 'top-center',
    icon: '⚠️',
    style: {
      background: '#ff9800',
      color: '#fff',
    },
  });
};

export const showInfo = (message: string) => {
  toast(message, { 
    position: 'top-center',
    icon: 'ℹ️',
    style: {
      background: '#2196f3',
      color: '#fff',
    },
  });
};