import { useState } from 'react';
import PropTypes from 'prop-types';
import {TextField, Button, Stack} from '@mui/material';

const TeamForm = ({ onAddTeam }) => {
    const [teamName, setTeamName] = useState('');

    const handleAddTeam = () => {
        onAddTeam({ name: teamName, members: [] });
        setTeamName('');
    };

    return (
        <Stack spacing={2}>
            <TextField
                label='Team Name'
                variant='filled'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <Button variant='contained' onClick={handleAddTeam} disabled={!teamName.trim() }>Add Team</Button>
        </Stack>
    );
};

TeamForm.propTypes = {
    onAddTeam: PropTypes.func,
};

export default TeamForm;