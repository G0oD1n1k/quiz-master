import { useState, useEffect } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import { appController } from '../../controllers/app/AppController';

const AnswerProgress = ({ question, onProgressComplete }) => {
    const [progress, setProgress] = useState(0);
    const [timePerQuestion, setTimePerQuestion] = useState(0);

    useEffect(() => {
        const category = appController.store.categories.find(c => c.id === question.categoryId);
        const categorySetting = appController.store.settings.categories.find(c => c.categoryId === category.id);
        if (categorySetting) {
            setTimePerQuestion(categorySetting.timePerQuestion);
        }
    }, [question]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, (timePerQuestion * 1000) / 10); // Разделим время на 10, чтобы получить интервал для прогресса

        return () => {
            clearInterval(timer);
        };
    }, [timePerQuestion]);

    useEffect(() => {
        if (progress >= 100) {
            onProgressComplete();
        }
    }, [progress, onProgressComplete]);

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Прогресс отсчета времени на ответ</Typography>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default AnswerProgress;
