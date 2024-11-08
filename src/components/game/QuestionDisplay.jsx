import { Typography, Button, LinearProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

const QuestionDisplay = ({ question, onReadQuestion, onSelectAnswer, isReading, isAnswering, timeLeft }) => {
    return (
        <Box sx={{ p: 3, width: '100%', mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Category: {question?.category?.name}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Question: {question?.text}
            </Typography>
            {isReading && <LinearProgress />}
            {isAnswering && (
                <>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Time Left: {timeLeft} seconds
                    </Typography>
                    <Box>
                        {question?.answers?.map(answer => (
                            <Button
                                key={answer.id}
                                variant="contained"
                                onClick={() => onSelectAnswer(answer)}
                                sx={{ mb: 1 }}
                            >
                                {answer.text}
                            </Button>
                        ))}
                    </Box>
                </>
            )}
            {!isReading && !isAnswering && (
                <Button variant="contained" onClick={onReadQuestion}>
                    Read the Question
                </Button>
            )}
        </Box>
    );
};

QuestionDisplay.propTypes = {
    question: PropTypes.object,
    onReadQuestion: PropTypes.func.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    isReading: PropTypes.bool.isRequired,
    isAnswering: PropTypes.bool.isRequired,
    timeLeft: PropTypes.number.isRequired,
};

export default QuestionDisplay;
