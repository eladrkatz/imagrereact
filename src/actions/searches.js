
export function historySearchAdded(searchText) {
    return {
        type: 'HISTORY_SEARCH_ADDED',
        searchText
    };
}

export function imagesFetchDataSuccess(imageResults, provider) {
    return {
        type: 'IMAGES_FETCH_DATA_SUCCESS',
        imageResults,
        provider
    };
}

// export function imagesFetchDataSuccess2(imageResults) {
//     return {
//         type: 'IMAGES_FETCH_DATA_SUCCESS2',
//         imageResults
//     };
// }

export function clearHistory() {
    return {
        type: 'HISTORY_CLEAR'
    };
}

const flickrKey = '985f447a21b6d873f69e05f3232ef20d';
const pixabayKey = '5237003-df8ec7ded9cea8b1e96684130';

const providers = {
    pixabay: {
        url: (searchText, page) => `https://pixabay.com/api/?key=${pixabayKey}&q=${searchText}&image_type=photo&pretty=true&per_page=30&page=${page + 1}`,
        mapper: (response) => {
            return response.hits.map(r => {
                return {
                    id: r.id,
                    src: r.previewURL,
                    type: 'pixabay'
                };
            });

        }
    },
    flickr: {
        url: (searchText, page) =>`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${searchText}&format=json&nojsoncallback=1&per_page=30&page=${page}`,
        mapper: (response) => {
            let results = [];

            if (response.photos) {
                results = response.photos.photo.map(r => {
                    return {
                        id: r.id,
                        src: 'https://farm' + r.farm + '.staticflickr.com/' + r.server + '/' + r.id + '_' + r.secret + '.jpg',
                        type: 'flickr' };
                });
            }

            return results;
        }
    }
};

export function fetchImagesForProvider(provider, searchText) {
    return (dispatch) => {
        const page = 0;

        const url = providers[provider].url(searchText, page);
        const mapper = providers[provider].mapper;

        fetch(url).then(r => r.json()).then(r => {
            const results = mapper(r);

            dispatch(imagesFetchDataSuccess(results, provider));
        });
    };
}


// export function fetchImagesForBothProviders(searchText, addToHistory) {
//     return (dispatch) => {

//         if (addToHistory) {
//             dispatch(historySearchAdded(searchText));
//         }

//         let page = 0;

//         let urlPixabay = `https://pixabay.com/api/?key=5237003-df8ec7ded9cea8b1e96684130&q=${searchText}&image_type=photo&pretty=true&per_page=30&page=${page + 1}`;

//         fetch(urlPixabay).then(response => response.json()).then(response => {
//             let results = response.hits.map(r => {
//                 return {
//                     id: r.id,
//                     src: r.previewURL,
//                     type: 'pixabay'
//                 };
//             });

//             console.log('pixabay', response);

//             dispatch(imagesFetchDataSuccess(results));
//         });

//         let urlFlickr = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d8cee43cf49296059873ec9577364b4&text=${searchText}&format=json&nojsoncallback=1&per_page=30&page=${page}`;

//         fetch(urlFlickr).then(response => response.json()).then(response => {
//             let results = [];

//             if (response.photos) {
//                 results = response.photos.photo.map(r => {
//                     return {
//                         id: r.id,
//                         src: 'https://farm' + r.farm + '.staticflickr.com/' + r.server + '/' + r.id + '_' + r.secret + '.jpg',
//                         type: 'flickr' };
//                 });
//             }

//             console.log('flickr', response);

//             dispatch(imagesFetchDataSuccess2(results));

//         });
//     };
// }

// export function imagesFetchData(searchText, addToHistory) {
//     return (dispatch) => {

//         if (addToHistory) {
//             dispatch(historySearchAdded(searchText));
//         }

//         let urlPixabay = `https://pixabay.com/api/?key=5237003-df8ec7ded9cea8b1e96684130&q=${searchText}&image_type=photo&pretty=true`;

//         let urlFlickr = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b1e6a4f998bf767d9658f38be16c7b5f&text=${searchText}&format=json&nojsoncallback=1`;

//         Promise.all([fetch(urlPixabay), fetch(urlFlickr)]).then(responses => {
//             return Promise.all([responses[0].json(), responses[1].json()]);
//         }).then(responses => {

//             let results = [];

//             responses[0].hits.slice(0, 20).map(r => {
//                 results.push({
//                     id: r.id,
//                     src: r.previewURL,
//                     type: 'pixabay'
//                 });
//             });

//             if (responses[1].photos) {
//                 responses[1].photos.photo.slice(0, 20).map(r => {
//                     results.push({
//                         id: r.id,
//                         src: 'https://farm' + r.farm + '.staticflickr.com/' + r.server + '/' + r.id + '_' + r.secret + '.jpg',
//                         type: 'flickr'
//                     });
//                 });
//             }

//             dispatch(imagesFetchDataSuccess(results));
//         });
//     };
// }
