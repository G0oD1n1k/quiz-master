import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AnswerInput = ({ answers, onSelectAnswer, onSubmitAnswer, selectedAnswer }) => {
    return (
        <Box sx={{ p: 3, width: '100%', mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Select an Answer
            </Typography>
            <Box>
                {answers?.map(answer => (
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
            {selectedAnswer && (
                <Button variant="contained" onClick={onSubmitAnswer}>
                    Submit Answer
                </Button>
            )}
        </Box>
    );
};

AnswerInput.propTypes = {
    answers: PropTypes.array.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    onSubmitAnswer: PropTypes.func.isRequired,
    selectedAnswer: PropTypes.object,
};

export default AnswerInput;
