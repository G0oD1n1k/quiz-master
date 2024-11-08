import { Typography, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

const ResultDisplay = ({ results, onNextTurn }) => {
    const totalScore = Object.values(results).reduce((acc, team) => acc + team.score, 0);
    const winner = Object.keys(results).reduce((max, teamId) => results[teamId].score > results[max].score ? teamId : max, Object.keys(results)[0]);

    return (
        <Box sx={{ p: 3, width: '100%', mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Game Over
            </Typography>
            <Typography variant="h6" component="h3" gutterBottom>
                Total Score: {totalScore}
            </Typography>
            <Typography variant="h6" component="h3" gutterBottom>
                Winner: {results[winner].name}
            </Typography>
            <Button variant="contained" onClick={onNextTurn}>
                Next Turn
            </Button>
        </Box>
    );
};

ResultDisplay.propTypes = {
    results: PropTypes.object.isRequired,
    onNextTurn: PropTypes.func.isRequired,
};

export default ResultDisplay;
