import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, Stack
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PropTypes from "prop-types";


const CategoryList = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }) => {
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddCategory = () => {
        onAddCategory(newCategory);
        setNewCategory('');
    };

    const handleEditClick = (category) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };

    const handleEditSave = () => {
        if (editingCategory) {
            onEditCategory(editingCategory.id, editingCategory.name);
            setIsDialogOpen(false);
            setEditingCategory(null);
        }
    };

    const handleDeleteClick = (id) => {
        onDeleteCategory(id);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto' }}>
            <Stack spacing={2}>
                <TextField
                    label="New Category"
                    variant="filled"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleAddCategory}
                    disabled={!newCategory.trim()}
                >
                    Add
                </Button>
            </Stack>
            <List>
                {categories?.map((category) => (
                    <ListItem key={category.id}>
                        <ListItemText primary={category.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(category)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(category.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editingCategory?.name || ''}
                        onChange={(e) => setEditingCategory(prev => prev ? {...prev, name: e.target.value} : null)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

CategoryList.propTypes = {
    categories: PropTypes.array,
    onAddCategory: PropTypes.func,
    onEditCategory: PropTypes.func,
    onDeleteCategory: PropTypes.func,
}

export default CategoryList;