import { create } from 'zustand';

// Types
type ModalType = 'filter' | 'payment' | 'seats' | 'confirm' | null;

type FormState = {
  isDirty: boolean;
  isValid: boolean;
  errors: Record<string, string>;
};

type ToastMessage = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

// Centralized app state - combines app and UI state
interface AppState {
  // App metadata
  appVersion: string;
  lastSyncTime: Date | null;
  
  // Global loading and error states
  isAppLoading: boolean;
  appError: string | null;
  
  // Modal states
  activeModal: ModalType;
  modalData: Record<string, any>;
  
  // Form states
  forms: Record<string, FormState>;
  
  // Navigation state
  currentRoute: string;
  previousRoute: string;
  
  // UI flags
  isMenuOpen: boolean;
  
  // Toast notifications
  toastQueue: ToastMessage[];
  
  // App actions
  setAppLoading: (loading: boolean) => void;
  setAppError: (error: string | null) => void;
  setLastSyncTime: (time: Date) => void;
  clearAppState: () => void;
  
  // Modal actions
  openModal: (type: ModalType, data?: Record<string, any>) => void;
  closeModal: () => void;
  setModalData: (data: Record<string, any>) => void;
  
  // Form actions
  setFormState: (formId: string, state: Partial<FormState>) => void;
  resetForm: (formId: string) => void;
  
  // Navigation actions
  setCurrentRoute: (route: string) => void;
  setPreviousRoute: (route: string) => void;
  
  // UI flag actions
  toggleMenu: () => void;
  
  // Toast actions
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  appVersion: '2.0.0',
  lastSyncTime: null,
  isAppLoading: false,
  appError: null,
  activeModal: null,
  modalData: {},
  forms: {},
  currentRoute: '/',
  previousRoute: '/',
  isMenuOpen: false,
  toastQueue: [],
  
  // App actions
  setAppLoading: (loading) => set({ isAppLoading: loading }),
  setAppError: (error) => set({ appError: error }),
  setLastSyncTime: (time) => set({ lastSyncTime: time }),
  clearAppState: () => set({
    isAppLoading: false,
    appError: null,
    lastSyncTime: null,
  }),
  
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
  toggleMenu: () => set(prevState => ({ isMenuOpen: !prevState.isMenuOpen })),
  
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
