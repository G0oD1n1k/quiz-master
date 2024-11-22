import {useEffect, useState} from 'react';
import { Typography, Box, Button } from '@mui/material';
import { appController } from '../../controllers/app/AppController';

const QuestionSelection = ({ onSelectQuestion, selectedCategory }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const { questions, settings } = appController.store;

    useEffect(() => {
        if (selectedCategory) {
            const questionsInCategory = questions.filter(
                question => question.categoryId === selectedCategory.id && !settings.questions.find(q => q.questionId === question.id).answered
            );
            if (questionsInCategory.length > 0) {
                const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];
                setCurrentQuestion(randomQuestion);
            }
        }
    }, [selectedCategory, questions, settings]);

    const handleSelectQuestion = () => {
        onSelectQuestion(currentQuestion);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Категория: {selectedCategory?.name}</Typography>
            <Typography variant="h6">Вопрос: {currentQuestion?.text}</Typography>
            <Button variant="contained" onClick={handleSelectQuestion}>
                Закончить чтение вопроса
            </Button>
        </Box>
    );
};

export default QuestionSelection;
