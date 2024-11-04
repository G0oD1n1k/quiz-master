import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { appController } from './controllers/app/AppController.jsx';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5', // Синий
            light: '#757de8',
            dark: '#002984',
        },
        secondary: {
            main: '#f50057', // Розовый
            light: '#ff5983',
            dark: '#bb002f',
        },
        background: {
            default: '#f5f5f5', // Светло-серый фон
            paper: '#ffffff',   // Белый фон для компонентов
        },
        text: {
            primary: '#333333', // Тёмно-серый для основного текста
            secondary: '#757575', // Серый для вторичного текста
        },
        error: {
            main: '#f44336', // Красный для ошибок
        },
        warning: {
            main: '#ff9800', // Оранжевый для предупреждений
        },
        info: {
            main: '#2196f3', // Голубой для информационных сообщений
        },
        success: {
            main: '#4caf50', // Зелёный для успешных действий
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .05)',
                    width: '100%',
                    marginLeft: 0,
                    marginRight: 0,
                },
            },
        },
    },
});

appController.initializeApp().then(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StrictMode>,
    )
});
