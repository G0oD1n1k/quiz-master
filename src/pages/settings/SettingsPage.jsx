import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    Select, MenuItem
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {appController} from "../../controllers/app/AppController.jsx";

const SettingsPage = () => {
    const { categories, questions } = appController.store;

    const [settings, setSettings] = useState(() => {
        const initialSettings = appController.getSettings();
        if (!initialSettings?.categories || initialSettings?.categories?.length === 0) {
            initialSettings.categories = categories.map(category => ({
                categoryId: category.id,
                timePerQuestion: 60,
            }));
            console.log({'initialSettings': 'categories'});
        }
        if (!initialSettings?.questions || initialSettings.questions?.length === 0) {
            initialSettings.questions = questions.map(question => ({
                questionId: question.id,
                answered: false,
            }));
            console.log({'initialSettings': 'questions'});
        }
        return initialSettings;
    });
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredQuestions = selectedCategory
        ? settings?.questions?.filter(question =>
            questions?.find(q => q.id === question.questionId)?.categoryId === selectedCategory
        )
        : settings?.questions;

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveSettings = () => {
        appController.saveSettings(settings);
    };

    const handleExportConfig = () => {
        const config = appController.exportConfig();
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz-config.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportConfig = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target?.result);
                    appController.importConfig(config);
                    setSettings(appController.getSettings());
                } catch (error) {
                    console.error('Error importing config:', error);
                    alert('Error importing config. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <Box sx={{ width: '56rem', margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="category-settings-content"
                        id="category-settings-header"
                    >
                        <Typography>Category Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ maxHeight: settings.categories.length > 4 ? 360 : 'auto', overflowY: 'auto' }}>
                        {settings?.categories?.map((category, index) => (
                            <Box key={category.categoryId} sx={{ mb: 2 }}>
                                <Typography variant="h6">{categories.find(c => c.id === category.categoryId)?.name}</Typography>
                                <TextField
                                    fullWidth
                                    label="Time per question (seconds)"
                                    type="number"
                                    value={category.timePerQuestion}
                                    onChange={(e) => {
                                        const newCategories = [...settings.categories];
                                        newCategories[index].timePerQuestion = parseInt(e.target.value);
                                        handleSettingChange('categories', newCategories);
                                    }}
                                    margin="normal"
                                />
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="question-settings-content"
                        id="question-settings-header"
                    >
                        <Typography>Question Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ maxHeight: filteredQuestions.length > 4 ? 360 : 'auto', overflowY: 'auto' }}>
                        <Box sx={{ mb: 2 }}>
                            <Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="">All Categories</MenuItem>
                                {categories?.map(category => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        {filteredQuestions?.map((question) => (
                            <Box key={question.questionId} sx={{ mb: 2 }}>
                                <Typography variant="h6">{questions.find(q => q.id === question.questionId)?.text}</Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={question.answered}
                                            onChange={(e) => {
                                                const newQuestions = [...settings.questions];
                                                const index = settings?.questions?.findIndex(q => q.questionId === question.questionId);
                                                newQuestions[index].answered = e.target.checked;
                                                handleSettingChange('questions', newQuestions);
                                            }}
                                        />
                                    }
                                    label="Answered"
                                />
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>

                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleSaveSettings}>
                        Save Settings
                    </Button>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Import/Export Configuration
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="secondary" onClick={handleExportConfig}>
                        Export Config
                    </Button>
                    <input
                        accept=".json"
                        style={{ display: 'none' }}
                        id="import-config"
                        type="file"
                        onChange={handleImportConfig}
                    />
                    <label htmlFor="import-config">
                        <Button variant="contained" color="secondary" component="span">
                            Import Config
                        </Button>
                    </label>
                </Box>
            </Paper>
        </Box>
    );
};

export default SettingsPage;