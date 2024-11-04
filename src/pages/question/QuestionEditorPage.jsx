import {Box, Grid2, Paper, Typography} from '@mui/material';
import {appController} from "../../controllers/app/AppController.jsx";
import CategoryList from "../../components/question/list/CategoryList.jsx";
import QuestionList from "../../components/question/list/QuestionList.jsx";
import AnswerList from "../../components/question/list/AnswerList.jsx";
import {observer} from "mobx-react-lite";

const QuestionEditorPage = observer(() => {
    const { categories } = appController.store;
    const { questions } = appController.store;

    const handleAddCategory = (category) => {
        appController.addCategory(category);
    };

    const handleEditCategory = (id, newName) => {
        appController.editCategory(id, newName);
    };

    const handleDeleteCategory = (id) => {
        appController.deleteCategory(id);
    };

    const handleAddQuestion = (question) => {
        appController.addQuestion(question);
    };

    const handleEditQuestion = (id, newQuestion) => {
        appController.editQuestion(id, newQuestion);
    };

    const handleDeleteQuestion = (id) => {
        appController.deleteQuestion(id);
    }

    const handleAddAnswer = (questionId, answer) => {
        appController.addAnswer(questionId, answer);
    };

    const handleEditAnswer = (questionId, answerId, newAnswer) => {
        appController.editAnswer(questionId, answerId, newAnswer);
    };

    const handleDeleteAnswer = (questionId, answerId) => {
        appController.deleteAnswer(questionId, answerId);
    };

    return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Question Editor
        </Typography>

        <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6} item={'true'}>
                <Grid2 container spacing={2} direction="column">
                    <Grid2 item={'true'}>
                        <Paper elevation={3} sx={{ p: 3, width: '24rem'}}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Category List
                            </Typography>

                            <CategoryList
                                categories={categories}
                                onAddCategory={handleAddCategory}
                                onEditCategory={handleEditCategory}
                                onDeleteCategory={handleDeleteCategory}
                            />
                        </Paper>
                    </Grid2>
                    <Grid2 item={'true'}>
                        <Paper elevation={3} sx={{ p: 3, width: '24rem'}}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Question List
                            </Typography>

                            <QuestionList
                                categories={categories}
                                questions={questions}
                                onAddQuestion={handleAddQuestion}
                                onEditQuestion={handleEditQuestion}
                                onDeleteQuestion={handleDeleteQuestion}
                            />
                        </Paper>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2 xs={12} md={6} item={'true'}>
                <Paper elevation={3} sx={{ p: 3, width: '32rem' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Answer List
                    </Typography>

                    <AnswerList
                        questions={questions}
                        categories={categories}
                        onAddAnswer={handleAddAnswer}
                        onEditAnswer={handleEditAnswer}
                        onDeleteAnswer={handleDeleteAnswer}
                    />
                </Paper>
            </Grid2>
        </Grid2>
    </Box>
    );
});



export default QuestionEditorPage;