
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
