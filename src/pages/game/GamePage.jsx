import {useEffect, useState} from 'react';
import {Box, Typography, Button, Stack} from '@mui/material';
import WheelOfFortune from "../../components/game/WheelOfFortune.jsx";
import CurrentTeamIndicator from "../../components/game/CurrentTeamIndicator.jsx";
import QuestionSelection from "../../components/game/QuestionSelection.jsx";
import QuestionProgress from "../../components/game/QuestionProgress.jsx";
import AnswerSelection from "../../components/game/AnswerSelection.jsx";
import AnswerProgress from "../../components/game/AnswerProgress.jsx";
import GameEnd from "../../components/game/GameEnd.jsx";
import AnswerCheck from "../../components/game/AnswerCheck.jsx";
import {appController} from "../../controllers/app/AppController.jsx";

const GamePage = () => {
    const [currentTeam, setCurrentTeam] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [nextTeam, setNextTeam] = useState(null);
    const [gameState, setGameState] = useState('wheel'); // wheel, question, answer, check, end
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [progress, setProgress] = useState(0);
    const [transferQuestion, setTransferQuestion] = useState(false);

    const { teams, settings } = appController.store;

    useEffect(() => {
        if (teams.length > 0) {
            setCurrentTeam(teams[0]);
            setNextTeam(teams[0]);
        }
    }, [teams]);

    const handleNewGame = () => {
        appController.resetGame();
    };

    const handleSpinWheel = (category, question) => {
        setSelectedCategory(category);
        setCurrentQuestion(question);
        setGameState('question');
    };

    const handleSelectQuestion = (question) => {
        setSelectedQuestion(question);
        setGameState('answer');
    };

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
        setGameState('check');
    };

    const handleNextTurn = () => {
        setCurrentTeam()
        if (isGameOver()) {
            setGameState('end');
        } else {
            setGameState('wheel');
            setSelectedQuestion(null);
            setSelectedAnswer(null);
            setProgress(0);
            setTransferQuestion(false);
            setCurrentTeam(nextTeam);
            setNextTeam(getNextTeam(nextTeam));
        }
    };

    const handleTransferQuestion = () => {
        setTransferQuestion(true);
        setGameState('transfer');
    };

    const handleEndGame = () => {
        setGameState('end');
    };

    const handleProgressComplete = () => {
        setGameState('answer');
    };

    const handleSelectTeam = (team) => {
        setCurrentTeam(team);
        setNextTeam(getNextTeam(team));
        setGameState('question');
    };

    const isGameOver = () => {
        return settings.questions.every(q => q.answered);
    };

    const getNextTeam = (currentTeam) => {
        const currentIndex = teams.findIndex(team => team.id === currentTeam.id);
        return teams[(currentIndex + 1) % teams.length];
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Game Screen
            </Typography>
            <CurrentTeamIndicator team={currentTeam} />
            {gameState === 'wheel' && (
                <>
                    <WheelOfFortune onSpin={handleSpinWheel} />
                </>
            )}
            {gameState === 'question' && (
                <>
                    <QuestionSelection
                        selectedCategory={selectedCategory}
                        onSelectQuestion={handleSelectQuestion}
                    />
                    <QuestionProgress onProgressComplete={handleProgressComplete} />
                    <Button variant="contained" onClick={handleTransferQuestion}>
                        Передать вопрос
                    </Button>
                </>
            )}
            {gameState === 'transfer' && (
                <>
                    <Typography variant="h6">Выберите команду для передачи вопроса</Typography>
                    <Stack spacing={2} direction="row">
                        {teams.map(team => (
                            <Button
                                key={team.id}
                                variant="contained"
                                onClick={() => handleSelectTeam(team)}
                            >
                                {team.name}
                            </Button>
                        ))}
                    </Stack>
                </>
            )}
            {gameState === 'answer' && (
                <>
                    <AnswerSelection
                        question={selectedQuestion}
                        onSelectAnswer={handleSelectAnswer}
                    />
                    <AnswerProgress question={selectedQuestion} onProgressComplete={handleNextTurn} />
                    <Button variant="contained" onClick={handleTransferQuestion}>
                        Передать вопрос
                    </Button>
                </>
            )}
            {gameState === 'check' && (
                <>
                    <AnswerCheck
                        question={selectedQuestion}
                        selectedAnswer={selectedAnswer}
                        currentTeam={currentTeam}
                        onNextTurn={handleNextTurn}
                    />
                </>
            )}
            {gameState === 'end' && (
                <>
                    <GameEnd onEndGame={handleEndGame} />
                </>
            )}
        </Box>
    );
};

export default GamePage;
