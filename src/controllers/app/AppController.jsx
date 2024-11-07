import { appStore } from '../../stores/AppStore.js';

class AppController {
    constructor() {
        this.store = appStore;
    }

    async initializeApp() {
        try {
            const [teamsData, questionsData, categoriesData] = await Promise.all([
                this.fetchTeams(),
                this.fetchQuestions(),
                this.fetchCategories()
            ]);

            this.store.setTeams(teamsData);
            this.store.setQuestions(questionsData);
            this.store.setCategories(categoriesData);
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    // Методы для получения данных с сервера (имитация)
    async fetchTeams() {
        const teamsData = localStorage.getItem('teams');
        return teamsData ? JSON.parse(teamsData) : [];
    }

    async fetchQuestions() {
        const questionsData = localStorage.getItem('questions');
        return questionsData ? JSON.parse(questionsData) : [];
    }

    async fetchCategories() {
        const categoriesData = localStorage.getItem('categories');
        return categoriesData ? JSON.parse(categoriesData) : [];
    }

    saveData() {
        localStorage.setItem('teams', JSON.stringify(this.store.teams));
        localStorage.setItem('questions', JSON.stringify(this.store.questions));
        localStorage.setItem('categories', JSON.stringify(this.store.categories));
        localStorage.setItem('settings', JSON.stringify(this.store.settings));
        localStorage.setItem('results', JSON.stringify(this.store.results));
    }

    addTeam(team) {
        this.store.addTeam(team);
        this.saveData();
    }

    updateTeam(teamId, updatedTeam) {
        this.store.updateTeam(teamId, updatedTeam);
        this.saveData();
    }

    editNameTeam(teamId, name) {
        this.store.editNameTeam(teamId, name);
        this.saveData();
    }

    deleteTeam(teamId) {
        this.store.deleteTeam(teamId);
        this.saveData();
    }

    deleteMember(teamId, member) {
        this.store.deleteMember(teamId, member);
        this.saveData();
    }

    editMember(teamId, member, newMember) {
        this.store.editMember(teamId, member, newMember);
        this.saveData();
    }

    // Методы для управления вопросами
    addQuestion(question) {
        this.store.addQuestion(question);
        this.saveData();
    }

    editQuestion(id, newQuestion) {
        this.store.editQuestion(id, newQuestion);
        this.saveData();
    }

    deleteQuestion(id) {
        this.store.deleteQuestion(id);
        this.saveData();
    }

    // Методы для управления категориями
    addCategory(category) {
        this.store.addCategory(category);
        this.saveData();
    }

    editCategory(categoryId, name) {
        this.store.editCategory(categoryId, name);
        this.saveData();
    }

    deleteCategory(categoryId) {
        this.store.deleteCategory(categoryId);
        this.saveData();
    }

    addAnswer(questionId, answer) {
        this.store.addAnswer(questionId, answer);
        this.saveData();
    }

    editAnswer(questionId, answerId, newAnswer) {
        this.store.editAnswer(questionId, answerId, newAnswer);
        this.saveData();
    }

    deleteAnswer(questionId, answerId) {
        this.store.deleteAnswer(questionId, answerId);
        this.saveData();
    }

    saveQuestions(questions) {
        this.questions = questions;
        this.saveData();
    }

    saveCategories(categories) {
        this.categories = categories;
        this.saveData();
    }

    // Метод для обработки ответа команды
    handleTeamAnswer(teamId, questionId, isCorrect, score) {
        this.store.updateTeamScore(teamId, score);
        this.store.addTeamAnswer(teamId, questionId, isCorrect);
    }

    getSettings() {
        return this.store.getSettings();
    }

    saveSettings(newSettings) {
        this.store.saveSettings(newSettings);
    }

    exportConfig() {
        return this.store.exportConfig();
    }

    importConfig(config) {
        this.store.importConfig(config);
        this.saveData();
    }

    addCategorySetting(categoryId, timePerQuestion) {
        this.store.addCategorySetting(categoryId, timePerQuestion);
    }

    updateCategorySetting(categoryId, timePerQuestion) {
        this.store.updateCategorySetting(categoryId, timePerQuestion);
    }

    deleteCategorySetting(categoryId) {
        this.store.deleteCategorySetting(categoryId);
    }
}

export const appController = new AppController();