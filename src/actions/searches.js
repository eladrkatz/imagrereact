

export function historySearchAdded(searchText) {
    return {
        type: 'HISTORY_SEARCH_ADDED',
        searchText
    };
}

export function imagesFetchDataSuccess(imageResults) {
    return {
        type: 'IMAGES_FETCH_DATA_SUCCESS',
        imageResults
    };
}

export function clearHistory() {
    return {
        type: 'HISTORY_CLEAR'
    };
}

export function imagesFetchData(searchText, addToHistory) {
    return (dispatch) => {

        if (addToHistory) {
            dispatch(historySearchAdded(searchText));
        }

        let urlPixabay = `https://pixabay.com/api/?key=5237003-df8ec7ded9cea8b1e96684130&q=${searchText}&image_type=photo&pretty=true`;

        let urlFlickr = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2f70f1a0e94575ba10c9dda701454c42&text=${searchText}&format=json&nojsoncallback=1`;


        Promise.all([fetch(urlPixabay), fetch(urlFlickr)]).then(responses => {
            return Promise.all([responses[0].json(), responses[1].json()]);
        }).then(responses => {

            let results = [];

            responses[0].hits.slice(0, 20).map(r => {
                results.push({
                    id: r.id,
                    src: r.previewURL,
                    type: 'pixabay'
                });
            });

            responses[1].photos.photo.slice(0, 20).map(r => {
                results.push({
                    id: r.id,
                    src: 'https://farm' + r.farm + '.staticflickr.com/' + r.server + '/' + r.id + '_' + r.secret + '.jpg',
                    type: 'flickr'
                });
            });

            dispatch(imagesFetchDataSuccess(results));
        });
    };
}
