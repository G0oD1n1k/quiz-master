import { useState, useEffect } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const QuestionProgress = ({ onProgressComplete }) => {
    const [progress, setProgress] = useState(0);

    const timePerQuestion = 60;

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
            <Typography variant="h6">Прогресс зачтения вопроса</Typography>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default QuestionProgress;
