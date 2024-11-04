import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material';
import { appController } from "../../controllers/app/AppController.jsx";

const SettingsPage = () => {
    const [settings, setSettings] = useState(() => appController.getSettings());

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
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Game Settings
                </Typography>
                <TextField
                    fullWidth
                    label="Time per question (seconds)"
                    type="number"
                    value={settings.timePerQuestion}
                    onChange={(e) => handleSettingChange('timePerQuestion', parseInt(e.target.value))}
                    margin="normal"
                />

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