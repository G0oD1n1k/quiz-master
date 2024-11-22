import { useState } from 'react';
import { Typography, Box, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const AnswerSelection = ({ question, onSelectAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleConfirmAnswer = () => {
        onSelectAnswer(selectedAnswer);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Выберите ответ</Typography>
            <RadioGroup
                value={selectedAnswer?.id}
                onChange={(e) => handleSelectAnswer(question?.answers?.find(a => a.id === e.target.value))}
            >
                {question?.answers?.map(answer => (
                    <FormControlLabel
                        key={answer.id}
                        value={answer.id}
                        control={<Radio />}
                        label={answer.text}
                    />
                ))}
            </RadioGroup>
            <Button variant="contained" onClick={handleConfirmAnswer}>
                Подтвердить ответ
            </Button>
        </Box>
    );
};

export default AnswerSelection;
