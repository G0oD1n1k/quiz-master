// src/components/game/WheelOfFortune.jsx
import React from 'react';
import WheelComponent from '../wheel/WheelComponent';
import { appController } from '../../controllers/app/AppController';
import { Button } from '@mui/material';

const WheelOfFortune = ({ onSpin, onNewGame }) => {
    const { categories, questions, settings } = appController.store;

    // Фильтрация категорий, у которых есть неотвеченные вопросы
    const filteredCategories = categories.filter(category => {
        const questionsInCategory = questions.filter(
            question => question.categoryId === category.id && !settings.questions.find(q => q.questionId === question.id).answered
        );
        return questionsInCategory.length > 0;
    });

    const segments = filteredCategories.map(category => category.name);
    const segColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFA1'];

    const handleFinished = (winningSegment) => {
        const category = categories.find(c => c.name === winningSegment);
        const questionsInCategory = questions.filter(q => q.categoryId === category.id && !q.answered);
        if (questionsInCategory.length > 0) {
            const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];
            onSpin(category, randomQuestion);
        }
    };

    return (
        <>
            {segments.length > 0 ? (
                <WheelComponent
                    segments={segments}
                    segColors={segColors}
                    onFinished={handleFinished}
                    primaryColor='black'
                    contrastColor='white'
                    buttonText='Spin'
                    isOnlyOnce={false}
                    size={290}
                    upDuration={100}
                    downDuration={1000}
                    fontFamily='Arial'
                />
            ) : (
                <Button variant="contained" onClick={onNewGame}>
                    Начать новую игру
                </Button>
            )}
        </>
    );
};

export default WheelOfFortune;
