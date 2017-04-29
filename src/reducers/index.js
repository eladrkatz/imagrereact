import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';
import { imageResults, imagesAreLoading, imagesHaveErrored } from './searches';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    imageResults,
    imagesAreLoading,
    imagesHaveErrored
});
