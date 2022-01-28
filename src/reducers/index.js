import {combineReducers} from 'redux';
import questions from './questions';
import tickets from './tickets';
import topicNames from './topicNames';
import topics from './topics';
import appActive from './app-active';

const allRedusers = combineReducers({
    questions: questions,
    cards: tickets,
    topicNames: topicNames,
    topics: topics,
    appActive: appActive,
});

export default allRedusers;