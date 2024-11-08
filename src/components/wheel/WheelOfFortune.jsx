import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import WheelComponent from "./WheelComponent.jsx";

const WheelOfFortune = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [prize, setPrize] = useState(null);

    const segments = [
        '100 points',
        '50 points',
        '20 points',
        '10 points',
        '5 points',
        'Lose a turn',
        '500 points',
        '300 points',
    ];

    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#81C7D4',
        '#97DECE',
        '#FF99C5',
        '#CF99DB',
        '#F0CF50',
        '#81C7D4',
    ];

    const onFinished = (winner) => {
        setPrize(winner);
        setIsSpinning(false);
    };

    const startSpin = () => {
        if (!isSpinning) {
            setIsSpinning(true);
            const randomSpinTime = Math.floor(Math.random() * 3) + 2; // Random spin time between 2 and 4 seconds
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * segments.length);
                onFinished(segments[randomIndex]);
            }, randomSpinTime * 1000);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Wheel of Fortune
            </Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <WheelComponent
                        segments={segments}
                        segColors={segColors}
                        winningSegment='won 10'
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor='black'
                        contrastColor='white'
                        buttonText='Spin'
                        isOnlyOnce={false}
                        size={290}
                        upDuration={100}
                        downDuration={1000}
                        fontFamily='Arial'
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button variant="contained" color="primary" onClick={startSpin} disabled={isSpinning}>
                        Spin
                    </Button>
                </Box>
                {prize && (
                    <Typography variant="h6" gutterBottom>
                        You won: {prize}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default WheelOfFortune;
