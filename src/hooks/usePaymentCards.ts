import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    fetchPaymentCards,
    createPaymentCard,
    updatePaymentCard,
    deletePaymentCard,
    setDefaultPaymentCard,
} from '@/utils/supabaseService';
import toast from 'react-hot-toast';


export const usePaymentCards = () => {
    return useQuery({
        queryKey: ['payment-cards'],
        queryFn: fetchPaymentCards,
    });
};

export const useCreatePaymentCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPaymentCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment-cards'] });
            toast.success('Payment card added successfully');
        },
        onError: (error: Error) => {
            toast.error(`Failed to add card: ${error.message}`);
        },
    });
};

export const useUpdatePaymentCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updatePaymentCard>[1] }) =>
            updatePaymentCard(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment-cards'] });
            toast.success('Payment card updated successfully');
        },
        onError: (error: Error) => {
            toast.error(`Failed to update card: ${error.message}`);
        },
    });
};

export const useDeletePaymentCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePaymentCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment-cards'] });
            toast.success('Payment card deleted successfully');
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete card: ${error.message}`);
        },
    });
};

export const useSetDefaultPaymentCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: setDefaultPaymentCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment-cards'] });
            toast.success('Default payment card updated');
        },
        onError: (error: Error) => {
            toast.error(`Failed to set default card: ${error.message}`);
        },
    });
};
