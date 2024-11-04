import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";

const NavigationBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar position="static" sx={{ color: 'white', minWidth: '60rem', borderRadius: '0.5rem' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button component={Link} to="/" color="inherit" >
                        Викторина
                    </Button>
                </Typography>


                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button component={Link} to="/teams" color="inherit">
                        Формирование команд
                    </Button>
                    <Button component={Link} to="/file" color="inherit">
                        Начать игру
                    </Button>
                    <Button component={Link} to="/settings" color="inherit">
                        Настройки
                    </Button>
                    <Button component={Link} to="/question" color="inherit">
                        Редактор вопросов
                    </Button>
                </Box>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

)};

export default NavigationBar;