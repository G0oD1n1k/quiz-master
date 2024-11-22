import { Typography, Box } from '@mui/material';

const CurrentTeamIndicator = ({ team }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Текущая команда: {team?.name}</Typography>
        </Box>
    );
};

export default CurrentTeamIndicator;
