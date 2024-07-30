import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface EditorSelectorProps {
    selectedCategory: number;
    handleOnChangeSelect: (event: SelectChangeEvent<number>) => void;
}

export default function EditorSelector({
    selectedCategory,
    handleOnChangeSelect,
}: EditorSelectorProps) {
    return (
        <Select
            variant='outlined'
            defaultValue={selectedCategory}
            onChange={handleOnChangeSelect}
            sx={{
                width: '200px',
                color: 'black',
                backgroundColor: 'white',
                '& .MuiMenu-list': {
                    p: '5px',
                },
            }}
        >
            <MenuItem value={0}>Users</MenuItem>
            <MenuItem value={1}>Events</MenuItem>
            <MenuItem value={2}>Courses</MenuItem>
        </Select>
    );
}
