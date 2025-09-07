import { toast } from 'react-hot-toast';

export const showError = (message: string) => {
    toast.error(message, { position: 'top-center' });
};

