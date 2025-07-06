import { useEffect, useState } from 'react';

type Location = {
    lat: number;
    lng: number;
};

export default function useGeoLocation() {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                setLocation({ lat: latitude, lng: longitude });
            },
            err => {
                setError(err.message);
            },
        );
    }, []);

    return { location, error };
}
