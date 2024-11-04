import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainPage from "./pages/main/MainPage.jsx";
import TeamFormationPage from "./pages/team/TeamFormationPage.jsx";
import NavigationBar from "./components/navigation/NavigationBar.jsx";
import QuestionEditorPage from "./pages/question/QuestionEditorPage.jsx";
import SettingsPage from "./pages/settings/SettingsPage.jsx";


const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Container maxWidth="lg">
                <Box sx={{
                    mt: 4,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/teams" element={<TeamFormationPage />} />
                        <Route path="/question" element={<QuestionEditorPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

export default App;