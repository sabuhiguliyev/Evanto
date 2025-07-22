import { create } from 'zustand';

type Location = {
    lat: number;
    lng: number;
};

type GeoState = {
    location: Location | null;
    error: string | null;
    city: string | null;
    country: string | null;
    setLocation: (location: Location) => void;
    setError: (error: string | null) => void;
    setCity: (city: string | null) => void;
    setCountry: (country: string | null) => void;
};

export const useGeoStore = create<GeoState>(set => ({
    city: null,
    country: null,
    location: null,
    error: null,
    setLocation: location => set({ location }),
    setError: error => set({ error }),
    setCity: city => set({ city }),
    setCountry: country => set({ country }),
}));
