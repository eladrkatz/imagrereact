import { combineReducers } from 'redux';
import { imageResults } from './searches';
import { historyCache } from './history';

export default combineReducers({
    imageResults, historyCache
});
