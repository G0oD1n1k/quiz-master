// src/components/game/GameEnd.jsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { appController } from '../../controllers/app/AppController';

const GameEnd = ({ onEndGame }) => {
    const { teams, results } = appController.store;

    const getWinner = () => {
        let maxScore = 0;
        let winner = null;
        for (const teamId in results) {
            if (results[teamId].score > maxScore) {
                maxScore = results[teamId].score;
                winner = teams.find(team => team.id === teamId);
            }
        }
        return {winner: winner, maxScore: maxScore};
    };

    const winner = getWinner();

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Игра завершена</Typography>
            <Typography variant="h6">Победитель: {winner?.name}</Typography>
            <Typography variant="h6">Количество очков: {winner?.maxScore}</Typography>
            <Button variant="contained" onClick={onEndGame}>
                Завершить игру
            </Button>
        </Box>
    );
};

export default GameEnd;
