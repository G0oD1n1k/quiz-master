import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const NavigationBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const navItems = [
        { label: 'Формирование команд', path: '/teams' },
        { label: 'Начать игру', path: '/game' },
        { label: 'Настройки', path: '/settings' },
        { label: 'Редактор вопросов', path: '/question' },
    ];

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'primary.main', color: 'white', borderRadius: '0.5rem', minWidth: '60rem' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button component={Link} to="/" color="inherit">
                            Викторина
                        </Button>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        {navItems?.map((item) => (
                            <Button key={item.label} component={Link} to={item.path} color="inherit">
                                {item.label}
                            </Button>
                        ))}
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
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                <Box onClick={handleDrawerClose} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        Викторина
                    </Typography>
                    <List>
                        {navItems?.map((item) => (
                            <ListItem button key={item.label} component={Link} to={item.path}>
                                <ListItemText secondary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default NavigationBar;
