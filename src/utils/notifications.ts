import { toast } from 'react-hot-toast';

export const showError = (message: string) => {
    toast.error(message, { position: 'top-left' });
};

export const showSuccess = (message: string) => {
    toast.success(message, { position: 'top-left' });
};
