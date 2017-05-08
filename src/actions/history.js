
export function clearHistory() {
    return {
        type: 'HISTORY_CLEAR'
    };
}


export function historySearchAdded(searchText) {
    return {
        type: 'HISTORY_SEARCH_ADDED',
        searchText
    };
}
