// src/pages/game/GamePage.jsx
import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, LinearProgress } from '@mui/material';
import { appController } from '../../controllers/app/AppController.jsx';
import WheelComponent from '../../components/wheel/WheelComponent.jsx';
import QuestionDisplay from '../../components/game/QuestionDisplay.jsx';
import AnswerInput from '../../components/game/AnswerInput.jsx';
import ResultDisplay from '../../components/game/ResultDisplay.jsx';
import TeamIndicator from '../../components/game/TeamIndicator.jsx';
import { observer } from 'mobx-react-lite';

const GamePage = observer(() => {
    const { teams, categories, questions, results } = appController.store;
    const [currentTeam, setCurrentTeam] = useState(teams[0]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [isAnswering, setIsAnswering] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (isReading) {
            const timer = setTimeout(() => {
                setIsReading(false);
                setIsAnswering(true);
            }, 5000); // 5 seconds for reading the question
            return () => clearTimeout(timer);
        }
    }, [isReading]);

    useEffect(() => {
        if (isAnswering) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isAnswering]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmitAnswer();
        }
    }, [timeLeft]);

    const handleSpin = () => {
        setIsSpinning(true);
        // Logic to spin the wheel and select a category
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        setSelectedCategory(randomCategory);
        setIsSpinning(false);
    };

    const handleReadQuestion = () => {
        setIsReading(true);
        // Logic to select a random question from the selected category
        const filteredQuestions = questions.filter(q => q.categoryId === selectedCategory.id && !q.answered);
        if (filteredQuestions.length === 0) {
            setIsReading(false);
            setIsSpinning(false);
            setSelectedCategory(null);
            alert('No questions available in this category.');
            return;
        }
        const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
        setCurrentQuestion(randomQuestion);
        setTimeLeft(randomQuestion.timePerQuestion);
    };

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmitAnswer = () => {
        // Logic to check the answer and update the score
        if (selectedAnswer) {
            const scoreMultiplier = selectedAnswer.isCorrect ? 1 : 0;
            // appController.handleTeamAnswer(currentTeam.id, currentQuestion.id, selectedAnswer.isCorrect, currentQuestion.points * scoreMultiplier);
        } else {
            // appController.handleTeamAnswer(currentTeam.id, currentQuestion.id, false, 0);
        }
        setIsAnswering(false);
        setSelectedAnswer(null);
        setCurrentQuestion(null);
        setSelectedCategory(null);
        setIsReading(false);
        setIsSpinning(false);
        setTimeLeft(0);

        // Check if the game is over
        const allQuestionsAnswered = questions.every(q => q.answered);
        if (allQuestionsAnswered) {
            setIsGameOver(true);
        } else {
            handleNextTurn();
        }
    };

    const handleNextTurn = () => {
        // Logic to move to the next team
        const currentIndex = teams.findIndex(team => team.id === currentTeam.id);
        const nextIndex = (currentIndex + 1) % teams.length;
        setCurrentTeam(teams[nextIndex]);
    };

    const handleEndGame = () => {
        // Logic to end the game and show results
        setIsGameOver(true);
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Game Page
            </Typography>

            {isGameOver ? (
                <ResultDisplay results={results} onEndGame={handleEndGame} />
            ) : (
                <>
                    <TeamIndicator team={currentTeam} />

                    <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
                        <WheelComponent
                            segments={categories.map(category => category.name)}
                            segColors={categories.map(category => category.color)}
                            winningSegment={selectedCategory?.name}
                            onFinished={(segment) => setSelectedCategory(segment)}
                            buttonText={isSpinning ? 'Spinning...' : 'Spin the Wheel'}
                            isOnlyOnce={false}
                            size={290}
                        />
                        <Button variant="contained" onClick={handleSpin} disabled={isSpinning}>
                            Spin the Wheel
                        </Button>
                    </Paper>

                    {selectedCategory && (
                        <QuestionDisplay
                            question={currentQuestion}
                            onReadQuestion={handleReadQuestion}
                            onSelectAnswer={handleSelectAnswer}
                            isReading={isReading}
                            isAnswering={isAnswering}
                            timeLeft={timeLeft}
                        />
                    )}

                    {currentQuestion && isAnswering && (
                        <AnswerInput
                            answers={currentQuestion.answers}
                            onSelectAnswer={handleSelectAnswer}
                            onSubmitAnswer={handleSubmitAnswer}
                            selectedAnswer={selectedAnswer}
                        />
                    )}
                </>
            )}
        </Box>
    );
});

export default GamePage;
