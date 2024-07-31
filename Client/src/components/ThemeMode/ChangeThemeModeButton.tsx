import { PaletteMode, Switch } from '@mui/material';
import { useState } from 'react';

export default function ChangeThemeModeButton() {
    const [mode, setMode] = useState<PaletteMode>('light');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.checked ? 'dark' : 'light');
    };

    return <Switch checked={mode !== 'light'} onChange={handleChange} />;
}
