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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px)',
            width: '100%',
            mx: 'auto',
        }}>
            <Container
                maxWidth='sm'
                sx={{
                    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                    minHeight: '100%'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 'calc(100vh - 64px)' // Вычитаем высоту AppBar
                }}>
                    <Typography variant="h2" gutterBottom>
                        Викторина
                    </Typography>
                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                        {[
                            { text: 'Формирование команд', path: '/teams' },
                            { text: 'Начать игру', path: '/game' },
                            { text: 'Настройки', path: '/settings' },
                            { text: 'Завершение игры', path: '/end-game' },
                            { text: 'Редактор вопросов', path: '/question' }
                        ].map((item, index) => (
                            <Grid2 xs={12} sm={6} key={index}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleNavigation(item.path)}
                                    fullWidth
                                >
                                    {item.text}
                                </Button>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>

            </Container>
        </Box>
    );
};

export default MainPage;