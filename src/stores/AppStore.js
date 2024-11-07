import { makeAutoObservable } from 'mobx';

class AppStore {
    teams = [];
    questions = [ {
        id: '',
        categoryId: '',
        text: '',
        answers: [],
    }];
    categories = [];
    results = {};
    settings = {
        categories: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    getSettings() {
        return { ...this.settings };
    }

    saveSettings(newSettings) {
        this.settings = { ...newSettings };
    }

    exportConfig() {
        return {
            settings: this.settings,
            categories: this.categories,
            questions: this.questions,
            results: this.results,
            teams: this.teams,
        };
    }

    addCategorySetting(categoryId, timePerQuestion) {
        if (!this.settings.categories) {
            this.settings.categories = [];
        }
        this.settings.categories.push({ categoryId, timePerQuestion });
    }

    updateCategorySetting(categoryId, timePerQuestion) {
        const index = this.settings.categories.findIndex((c) => c.categoryId === categoryId);
        if (index !== -1) {
            this.settings.categories[index].timePerQuestion = timePerQuestion;
        }
    }

    deleteCategorySetting(categoryId) {
        this.settings.categories = this.settings.categories.filter((c) => c.categoryId !== categoryId);
    }

    importConfig(config) {
        if (config.settings) this.settings = config.settings;
        if (config.categories) this.categories = config.categories;
        if (config.questions) this.questions = config.questions;
        if (config.teams) this.teams = config.teams;
    }

    setTeams(teams) {
        this.teams = teams;
    }

    addTeam(team) {
        this.teams.push({ id: crypto.randomUUID(), ...team });
    }

    updateTeam(teamId, updatedTeam) {
        const index = this.teams.findIndex(team => team.id === teamId);
        if (index !== -1) {
            this.teams[index] = { ...this.teams[index], ...updatedTeam };
        }
    }

    editNameTeam(teamId, name) {
        const index = this.teams.findIndex(team => team.id === teamId);
        if (index !== -1) {
            this.teams[index].name = name;
        }
    }

    deleteTeam(teamId) {
        this.teams = this.teams.filter(team => team.id !== teamId);
    }

    deleteMember(teamId, member) {
        const index = this.teams.findIndex(team => team.id === teamId);
        if (index !== -1) {
            const indexMember = this.teams[index].members.findIndex(members => members === member);
            if (indexMember !== -1) {
                this.teams[index].members.splice(indexMember, 1);
            }
        }
    }

    editMember(teamId, member, newMember) {
        const index = this.teams.findIndex(team => team.id === teamId);
        if (index !== -1) {
            const indexMember = this.teams[index].members.findIndex(members => members === member);
            if (indexMember !== -1) {
                this.teams[index].members[indexMember] = newMember;
            }
        }
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    addQuestion(question) {
        this.questions.push({ id: crypto.randomUUID(), ...question });
    }

    editQuestion(id, newQuestion) {
        const index = this.questions.findIndex(q => q.id === id);
        if (index !== -1) {
            this.questions[index] = newQuestion;
        }
    }

    deleteQuestion(id) {
        this.questions = this.questions.filter(q => q.id !== id);
    }

    addAnswer(questionId, answer) {
        const index = this.questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
            if (!this.questions[index].answers) {
                this.questions[index].answers = [];
            }
            this.questions[index].answers.push({ id: crypto.randomUUID(), ...answer });
        }
    }

    editAnswer(questionId, answerId, newAnswer) {
        const index = this.questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
            this.questions[index].answers = this.questions[index].answers.map(a => a.id === answerId ? newAnswer : a);
        }
    }

    deleteAnswer(questionId, answerId) {
        const index = this.questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
            this.questions[index].answers = this.questions[index].answers.filter(a => a.id !== answerId);
        }
    }

    setCategories(categories) {
        this.categories = categories;
    }

    addCategory(category) {
        this.categories.push({ id: crypto.randomUUID(), name: category });
    }

    editCategory(categoryId, name) {
        const index = this.categories.findIndex(c => c.id === categoryId);
        if (index !== -1) {
            this.categories[index].name = name;
        }
    }

    deleteCategory(categoryId) {
        this.categories = this.categories.filter(c => c.id !== categoryId);
    }

    setResults(results) {
        this.results = results;
    }

    updateTeamScore(teamId, score) {
        if (!this.results[teamId]) {
            this.results[teamId] = { score: 0, answers: [] };
        }
        this.results[teamId].score += score;
    }

    addTeamAnswer(teamId, questionId, isCorrect) {
        if (!this.results[teamId]) {
            this.results[teamId] = { score: 0, answers: [] };
        }
        this.results[teamId].answers.push({ questionId, isCorrect });
    }
}

export const appStore = new AppStore();