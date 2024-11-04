import { useState } from 'react';
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
    DialogActions,
    Select,
    MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

const QuestionList = observer(({ categories, questions, onAddQuestion, onEditQuestion, onDeleteQuestion }) => {
    const [newQuestion, setNewQuestion] = useState({
        categoryId: '',
        text: '',
    });
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddQuestion = () => {
        onAddQuestion(newQuestion);
        setNewQuestion({ categoryId: '', text: '' });
    };

    const handleEditClick = (question) => {
        setEditingQuestion(question);
        setIsDialogOpen(true);
    };

    const handleEditSave = () => {
        if (editingQuestion) {
            onEditQuestion(editingQuestion.id, editingQuestion);
            setIsDialogOpen(false);
            setEditingQuestion(null);
        }
    };

    const handleDeleteClick = (id) => {
        onDeleteQuestion(id);
    };

    const filteredQuestions = selectedCategory
        ? questions.filter((question) => question.categoryId === selectedCategory)
        : questions;

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            <Box sx={{ display: 'flex', marginBottom: 2 }}>
                <Select
                    value={newQuestion.categoryId}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setNewQuestion({ ...newQuestion, categoryId: e.target.value })
                    }}
                    sx={{ marginRight: 1, width: '8rem' }}
                >
                    <MenuItem value="">Select Category</MenuItem>
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Add Question"
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                    sx={{ flexGrow: 1, marginRight: 1 }}
                />
                <Button variant="contained" onClick={handleAddQuestion} disabled={!newQuestion.categoryId || !newQuestion.text}>
                    Add
                </Button>
            </Box>
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <List>
                    {filteredQuestions?.map((question) => (
                        <ListItem key={question.id}>
                            <ListItemText primary={question.text} secondary={categories.find(c => c.id === question.categoryId)?.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(question)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(question.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogContent>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={editingQuestion?.categoryId || ''}
                        onChange={(e) => setEditingQuestion(prev => prev ? { ...prev, categoryId: e.target.value } : null)}
                        fullWidth
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories?.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Question Text"
                        type="text"
                        fullWidth
                        value={editingQuestion?.text || ''}
                        onChange={(e) => setEditingQuestion(prev => prev ? { ...prev, text: e.target.value } : null)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
});

QuestionList.propTypes = {
    categories: PropTypes.array,
    questions: PropTypes.array,
    onAddQuestion: PropTypes.func,
    onEditQuestion: PropTypes.func,
    onDeleteQuestion: PropTypes.func,
};

export default QuestionList;
