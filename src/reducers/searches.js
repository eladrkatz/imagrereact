export function imagesHaveErrored(state = false, action) {
    switch (action.type) {
        case 'IMAGES_HAVE_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function imagesAreLoading(state = false, action) {
    switch (action.type) {
        case 'IMAGES_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function imageResults(state = [], action) {
    switch (action.type) {
        case 'IMAGES_FETCH_DATA_SUCCESS':
            return action.imageResults; //.slice(0, 10);

        default:
            return state;
    }
}
