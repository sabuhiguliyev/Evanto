import { create } from 'zustand';

// Types
type ModalType = 'filter' | 'payment' | 'seats' | 'confirm' | null;

type FormState = {
    isDirty: boolean;
    isValid: boolean;
    errors: Record<string, string>;
};

type UIState = {
    // Modal states
    activeModal: ModalType;
    modalData: Record<string, any>;
    
    // Form states
    forms: Record<string, FormState>;
    
    // Navigation state
    currentRoute: string;
    previousRoute: string;
    
    // UI flags
    isLoading: boolean;
    isMenuOpen: boolean;
    isFilterOpen: boolean;
    
    // Toast notifications
    toastQueue: Array<{
        id: string;
        message: string;
        type: 'success' | 'error' | 'warning' | 'info';
    }>;
    
    // Actions
    openModal: (type: ModalType, data?: Record<string, any>) => void;
    closeModal: () => void;
    setModalData: (data: Record<string, any>) => void;
    
    setFormState: (formId: string, state: Partial<FormState>) => void;
    resetForm: (formId: string) => void;
    
    setCurrentRoute: (route: string) => void;
    setPreviousRoute: (route: string) => void;
    
    setLoading: (loading: boolean) => void;
    toggleMenu: () => void;
    toggleFilter: () => void;
    
    addToast: (message: string, type: UIState['toastQueue'][0]['type']) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
};

export const useUIStore = create<UIState>((set, get) => ({
    // Initial state
    activeModal: null,
    modalData: {},
    forms: {},
    currentRoute: '/',
    previousRoute: '/',
    isLoading: false,
    isMenuOpen: false,
    isFilterOpen: false,
    toastQueue: [],
    
    // Modal actions
    openModal: (type, data = {}) => set({ 
        activeModal: type, 
        modalData: data 
    }),
    
    closeModal: () => set({ 
        activeModal: null, 
        modalData: {} 
    }),
    
    setModalData: (data) => set(state => ({ 
        modalData: { ...state.modalData, ...data } 
    })),
    
    // Form actions
    setFormState: (formId, state) => set(prevState => ({
        forms: {
            ...prevState.forms,
            [formId]: {
                ...prevState.forms[formId],
                ...state,
            }
        }
    })),
    
    resetForm: (formId) => set(prevState => ({
        forms: {
            ...prevState.forms,
            [formId]: {
                isDirty: false,
                isValid: true,
                errors: {},
            }
        }
    })),
    
    // Navigation actions
    setCurrentRoute: (route) => set(prevState => ({
        previousRoute: prevState.currentRoute,
        currentRoute: route,
    })),
    
    setPreviousRoute: (route) => set({ previousRoute: route }),
    
    // UI flag actions
    setLoading: (loading) => set({ isLoading: loading }),
    
    toggleMenu: () => set(prevState => ({ isMenuOpen: !prevState.isMenuOpen })),
    
    toggleFilter: () => set(prevState => ({ isFilterOpen: !prevState.isFilterOpen })),
    
    // Toast actions
    addToast: (message, type) => {
        const id = Date.now().toString();
        set(prevState => ({
            toastQueue: [...prevState.toastQueue, { id, message, type }]
        }));
        
        // Auto-remove toast after 5 seconds
        setTimeout(() => {
            get().removeToast(id);
        }, 5000);
    },
    
    removeToast: (id) => set(prevState => ({
        toastQueue: prevState.toastQueue.filter(toast => toast.id !== id)
    })),
    
    clearToasts: () => set({ toastQueue: [] }),
}));
