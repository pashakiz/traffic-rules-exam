export default function (state=null, action) {
    if (action.type === 'TAB_SELECTED') {
        let newState = {};
        switch (action.payload) {
            case 'tabExam':
                newState = {tab: action.payload, examMode: 'ticket'};
                break;
            case 'tabNumbers':
                newState = {tab: action.payload, examMode: 'ticket'};
                break;
            case 'tabTopics':
                newState = {tab: action.payload, examMode: 'topic'};
                break;
            default:
                newState = {tab: 'tabNumbers', examMode: 'ticket'};
                break;
        }
        return newState;
    } else {
        return state;
    }
}