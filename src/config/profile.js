import Moment from 'moment';

export const profile = {
    name: "Stephanie Ehrenberg",
    email: "sehrenbe@hm.edu",
    kudosPoints: 5,
    kudoPointsSum: 28,
    currentRank: 'regular',
    loginCount: 0,
    surveyCount: 0,
    feedbackIntervallInWeeks: 4,
    lastTodoVisit: {
        SHOW_OPEN: null,
        SHOW_COMPLETED: null
    },
};

export function updateLastTodoVisit (todoFilter) {
    profile.lastTodoVisit[todoFilter] = Moment();
}

export default profile;