import { reverseGeocode } from '@/utils/reverseGeocode';
import { useAppStore } from '@/store/appStore';
import { showError } from '@/utils/notifications';

export async function detectUserLocation() {
    const { setCity, setCountry, setLocationError } = useAppStore.getState();

    if (!navigator.geolocation) {
        setLocationError('Geolocation not supported');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async pos => {
            const { latitude, longitude } = pos.coords;
            const address = await reverseGeocode(latitude, longitude);
            if (address) {
                setLocationError(null);
                setCity(address.city || address.town || address.village || null);
                setCountry(address.country || null);
            } else {
                setLocationError('Reverse geocoding failed');
                showError('Could not detect location!');
            }
        },
        err => {
            setLocationError(err.message);
        },
    );
}
