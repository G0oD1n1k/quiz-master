import {
    Container,
    Box,
    Typography,
    Grid2,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Container
            maxWidth='sm'
            sx={{
                height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                minHeight: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'calc(100vh - 64px)' // Вычитаем высоту AppBar
            }}>
                <Typography variant="h2" gutterBottom>
                    Викторина
                </Typography>
                <Grid2 container rowSpacing={2} columnSpacing={2} >
                    {[
                        { text: 'Формирование команд', path: '/teams' },
                        { text: 'Начать игру', path: '/game' },
                        { text: 'Настройки', path: '/settings' },
                        { text: 'Завершение игры', path: '/end-game' },
                        { text: 'Редактор вопросов', path: '/question' }
                    ].map((item, index) => (
                        <Button
                            key={index}
                            variant='contained'
                            color='primary'
                            onClick={() => handleNavigation(item.path)}
                            fullWidth
                        >
                            {item.text}
                        </Button>
                    ))}
                </Grid2>
            </Box>

        </Container>
    );
};

export default MainPage;