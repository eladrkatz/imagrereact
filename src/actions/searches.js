
export function historySearchAdded(searchText) {
    return {
        type: 'HISTORY_SEARCH_ADDED',
        searchText
    };
}

export function imagesFetchDataSuccess(imageResults, provider, page) {
    return {
        type: 'IMAGES_FETCH_DATA_SUCCESS',
        imageResults,
        provider,
        page
    };
}

export function clearHistory() {
    return {
        type: 'HISTORY_CLEAR'
    };
}

const flickrKey = '985f447a21b6d873f69e05f3232ef20d';
const pixabayKey = '5237003-df8ec7ded9cea8b1e96684130';

const providers = {
    pixabay: {
        url: (searchText, page) => `https://pixabay.com/api/?key=${pixabayKey}&q=${searchText}&image_type=photo&pretty=true&per_page=10&page=${page + 1}`,
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
        url: (searchText, page) =>`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&text=${searchText}&format=json&nojsoncallback=1&per_page=10&page=${page + 1}`,
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

export function fetchImagesForProvider(provider, searchText, page) {
    return (dispatch) => {

        const url = providers[provider].url(searchText, page);
        const mapper = providers[provider].mapper;

        fetch(url).then(r => r.json()).then(r => {
            const results = mapper(r);

            dispatch(imagesFetchDataSuccess(results, provider, page));
        });
    };
}
