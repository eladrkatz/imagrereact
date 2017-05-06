
export function historyCache(state = [], action) {
    switch (action.type) {
        case 'HISTORY_SEARCH_ADDED':
            let cache = state.slice(0, 9);

            cache.splice(0, 0, {
                id: new Date().getTime(),
                term: action.searchText
            });

            return cache;

        case 'HISTORY_CLEAR':
            return [];
        default:
            return state;
    }
}

const initialState = {
    flickr: {
        imageResults: []
    },
    pixabay: {
        imageResults: []
    },
    page: 0
};

export function imageResults(state = initialState, action) {
    switch (action.type) {
        case 'IMAGES_FETCH_DATA_SUCCESS':
            let newState = Object.assign({}, state);

            newState.page = action.page;

            if (action.page === 0) {
                newState[action.provider].imageResults = action.imageResults;
            }
            else {
                newState[action.provider].imageResults = newState[action.provider].imageResults.concat(action.imageResults);
            }

            return newState;
        default:
            return state;
    }
}
