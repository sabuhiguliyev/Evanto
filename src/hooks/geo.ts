import { reverseGeocode } from '@/utils/reverseGeocode';
import { useGeoStore } from '@/store/geoStore';

export async function detectUserLocation() {
    const { setCity, setCountry, setError } = useGeoStore.getState();

    if (!navigator.geolocation) {
        setError('Geolocation not supported');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async pos => {
            const { latitude, longitude } = pos.coords;
            const address = await reverseGeocode(latitude, longitude);
            if (address) {
                setError(null);
                setCity(address.city || address.town || address.village || null);
                setCountry(address.country || null);
            } else {
                setError('Reverse geocoding failed');
            }
        },
        err => {
            setError(err.message);
        },
    );
}
