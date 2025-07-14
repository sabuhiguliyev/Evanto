import { useState, useEffect } from 'react';
import { TextField, InputAdornment, List, ListItem, Paper } from '@mui/material';
import { PlaceOutlined, KeyboardArrowRightRounded } from '@mui/icons-material';

type Suggestion = {
    display_name: string;
};

function LocationInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
            { signal: controller.signal },
        )
            .then(res => res.json())
            .then((data: Suggestion[]) => {
                setSuggestions(data.map(item => item.display_name));
            })
            .catch(() => {
                if (!controller.signal.aborted) setSuggestions([]);
            });

        return () => controller.abort();
    }, [query]);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <TextField
                fullWidth
                placeholder='Choose location'
                value={query}
                onChange={e => {
                    setQuery(e.target.value);
                    onChange(e.target.value);
                }}
                variant='outlined'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <PlaceOutlined style={{ color: '#5D9BFC' }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <KeyboardArrowRightRounded />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        height: '50px',
                    },
                }}
            />
            {suggestions.length > 0 && (
                <Paper
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        maxHeight: 150,
                        overflowY: 'auto',
                        zIndex: 10,
                    }}
                    elevation={3}
                >
                    <List disablePadding>
                        {suggestions.map((item, index) => (
                            <ListItem
                                key={index}
                                component='button'
                                onClick={() => {
                                    setQuery(item);
                                    onChange(item);
                                    setSuggestions([]);
                                }}
                            >
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </div>
    );
}

export default LocationInput;
