import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TextField, InputAdornment, IconButton, CircularProgress, Paper, List, ListItemButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { useGeoStore } from '@/store/geoStore';
import { reverseGeocode } from '@/utils/reverseGeocode';

interface NominatimResult {
    display_name: string;
}

interface LocationPickerProps {
    value: string;
    onChange?: (value: string) => void;
    error?: boolean;
    helperText?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, error, helperText }) => {
    const { setCity, setCoordinates, setError } = useGeoStore();
    const [internalValue, setInternalValue] = useState(value ?? '');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const userInputRef = useRef(false);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setSuggestions([]);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (userInputRef.current && internalValue && internalValue.length > 2) {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${internalValue}`,
                    );
                    const data: NominatimResult[] = await response.json();
                    const results = data
                        .map(item => {
                            const address = item.display_name.split(',').map(s => s.trim());
                            const city = address[0];
                            const country = address[address.length - 1];
                            return `${city}, ${country}`;
                        })
                        .filter(entry => entry && entry.includes(','));
                    setSuggestions(results);
                } catch (error) {
                    console.error('Error fetching location suggestions:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        }, 400);
        return () => clearTimeout(handler);
    }, [internalValue]);

    useEffect(() => {
        setInternalValue(value);
        userInputRef.current = false;
    }, [value]);

    const handleDetectLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ lat: latitude, lng: longitude });

                const address = await reverseGeocode(latitude, longitude);
                const place = address?.city || address?.town || address?.village || '';
                const country = address?.country || '';
                if (place && country) {
                    const location = `${place}, ${country}`;
                    setCity(location);
                    onChange?.(location);
                    setInternalValue(location);
                } else {
                    setError('Could not detect city name');
                }

                setLoading(false);
            },
            () => {
                setError('Unable to retrieve location');
                setLoading(false);
            },
        );
    };

    return (
        <div ref={containerRef} className='relative w-full'>
            <TextField
                placeholder='Search your location'
                value={internalValue}
                className='text-input'
                error={error}
                helperText={helperText}
                onChange={e => {
                    userInputRef.current = true;
                    const val = e.target.value;
                    setInternalValue(val);
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleDetectLocation}>
                                    {loading ? <CircularProgress size={20} /> : <MyLocationIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
            {suggestions.length > 0 && (
                <Paper className='absolute z-10 max-h-60 w-full overflow-y-auto'>
                    <List>
                        {suggestions.map((suggestion, i) => (
                            <ListItemButton
                                key={i}
                                onClick={() => {
                                    onChange?.(suggestion);
                                    setCity(suggestion);
                                    setSuggestions([]);
                                    setInternalValue(suggestion);
                                }}
                            >
                                {suggestion}
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            )}
        </div>
    );
};

export default LocationPicker;
