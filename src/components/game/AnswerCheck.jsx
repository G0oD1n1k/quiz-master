import { Typography, Box, Button } from '@mui/material';
import { appController } from '../../controllers/app/AppController';

const AnswerCheck = ({ question, currentTeam, selectedAnswer, onNextTurn }) => {
    const { results } = appController.store;

    const correctAnswer = question?.answers?.find(answer => answer.isCorrect);
    const isCorrect = selectedAnswer?.id === correctAnswer?.id;

    const handleNextTurn = () => {
        if (isCorrect) {
            appController.updateTeamScore(currentTeam.id, 10); // Например, 10 очков за правильный ответ
        }
        appController.addTeamAnswer(currentTeam?.id, question?.id, isCorrect);
        onNextTurn();
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">
                {isCorrect ? 'Выполнено' : 'Не выполнено'}
            </Typography>

            <Typography variant="h6">Правильный ответ: {correctAnswer.text}</Typography>
            <Typography variant="h6">Пояснение: {correctAnswer.explanation}</Typography>
            {correctAnswer.penalty && !isCorrect && <Typography variant="h6">Наказание: {correctAnswer?.penalty}</Typography>}
            <Button variant="contained" onClick={handleNextTurn}>
                Следующий ход
            </Button>
        </Box>
    );
};

export default AnswerCheck;
