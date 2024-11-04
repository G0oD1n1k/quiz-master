import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import PropTypes from "prop-types";

const TeamMemberInput = ({ onAddMember, teamId }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddMember = () => {
        onAddMember(teamId, inputValue);
        setInputValue('');
    };

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                label="Member Name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{ width: '100%' }}
            />
            <Button variant="contained" onClick={handleAddMember} sx={{width: '50%'}} disabled={!inputValue.trim()} >
                Add Member
            </Button>
        </Stack>
    );
};

TeamMemberInput.propTypes = {
    onAddMember: PropTypes.func,
    teamId: PropTypes.number,
}

export default TeamMemberInput;