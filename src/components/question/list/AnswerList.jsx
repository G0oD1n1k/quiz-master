// src/components/AnswerList.js
import React, { useEffect, useState } from 'react';
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
    Checkbox,
    FormControlLabel, Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

const AnswerList = observer(({ questions, categories, onAddAnswer, onEditAnswer, onDeleteAnswer }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newAnswer, setNewAnswer] = useState({
        text: '',
        isCorrect: false,
    });
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddAnswer = () => {
        if (currentQuestion) {
            onAddAnswer(currentQuestion.id, newAnswer);
            setNewAnswer({ text: '', isCorrect: false });
        }
    };

    const handleEditClick = (question, answer) => {
        setEditingAnswer(answer);
        setCurrentQuestion(question);
        setIsDialogOpen(true);
    };

    const handleEditSave = () => {
        if (editingAnswer && currentQuestion) {
            onEditAnswer(currentQuestion.id, editingAnswer.id, editingAnswer);
            setIsDialogOpen(false);
            setEditingAnswer(null);
        }
    };

    const handleDeleteClick = (questionId, answerId) => {
        onDeleteAnswer(questionId, answerId);
    };

    const filteredQuestions = selectedCategory
        ? questions.filter((question) => question.categoryId === selectedCategory)
        : questions;

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            <Select
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentQuestion(null);
                }}
                sx={{ marginBottom: 2, width: '100%' }}
                displayEmpty
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>

            <Select
                value={currentQuestion?.id || ''}
                onChange={(e) => {
                    setCurrentQuestion(questions.find((q) => q.id === e.target.value));
                }}
                sx={{ marginBottom: 2, width: '100%' }}
                displayEmpty
            >
                <MenuItem value="">Select Question</MenuItem>
                {filteredQuestions.map((question) => (
                    <MenuItem key={question.id} value={question.id}>
                        {question.text}
                    </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: 'flex', marginBottom: 2 }}>
                <TextField
                    label="Add Answer"
                    value={newAnswer.text}
                    onChange={(e) => setNewAnswer({ ...newAnswer, text: e.target.value })}
                    sx={{ flexGrow: 1, marginRight: 1 }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newAnswer.isCorrect}
                            onChange={(e) => setNewAnswer({ ...newAnswer, isCorrect: e.target.checked })}
                        />
                    }
                    label="Correct"
                />
            </Box>
            <Stack spacing={2}>
                <TextField
                    label="Explanation"
                    value={newAnswer.explanation || ''}
                    onChange={(e) => setNewAnswer({ ...newAnswer, explanation: e.target.value })}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Penalty"
                    value={newAnswer.penalty || ''}
                    onChange={(e) => setNewAnswer({ ...newAnswer, penalty: e.target.value })}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={handleAddAnswer} disabled={!newAnswer.text}>
                    Add
                </Button>
            </Stack>
            <List>
                {currentQuestion?.answers?.map((answer) => (
                    <ListItem key={answer.id}>
                        <ListItemText primary={answer.text} secondary={answer.isCorrect ? 'Correct' : 'Incorrect'} />
                        {answer?.penalty && <ListItemText secondary={`Penalty: ${answer?.penalty}`} sx={{ maxWidth: '16rem', marginRight: '1rem'}}/>}
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(currentQuestion, answer)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(currentQuestion.id, answer.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Edit Answer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Answer Text"
                        type="text"
                        fullWidth
                        value={editingAnswer?.text || ''}
                        onChange={(e) => setEditingAnswer((prev) => prev ? { ...prev, text: e.target.value } : null)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={editingAnswer?.isCorrect || false}
                                onChange={(e) => setEditingAnswer((prev) => prev ? { ...prev, isCorrect: e.target.checked } : null)}
                            />
                        }
                        label="Correct"
                    />
                    <TextField
                        margin="dense"
                        label="Explanation"
                        type="text"
                        fullWidth
                        value={editingAnswer?.explanation || ''}
                        onChange={(e) => setEditingAnswer((prev) => prev ? { ...prev, explanation: e.target.value } : null)}
                    />
                    <TextField
                        margin="dense"
                        label="Penalty"
                        type="text"
                        fullWidth
                        value={editingAnswer?.penalty || ''}
                        onChange={(e) => setEditingAnswer((prev) => prev ? { ...prev, penalty: e.target.value } : null)}
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

AnswerList.propTypes = {
    questions: PropTypes.array,
    onAddAnswer: PropTypes.func,
    onEditAnswer: PropTypes.func,
    onDeleteAnswer: PropTypes.func,
};

export default AnswerList;
