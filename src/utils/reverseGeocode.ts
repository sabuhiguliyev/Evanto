export async function reverseGeocode(lat: number, lng: number): Promise<Record<string, string> | null> {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        return data?.address || null;
    } catch (err) {
        console.error('Reverse geocoding failed:', err);
        return null;
    }
}
