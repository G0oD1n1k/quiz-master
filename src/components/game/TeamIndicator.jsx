import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const TeamIndicator = ({ team }) => {
    return (
        <Box sx={{ p: 3, width: '100%', mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Current Team: {team.name}
            </Typography>
        </Box>
    );
};

TeamIndicator.propTypes = {
    team: PropTypes.object.isRequired,
};

export default TeamIndicator;
