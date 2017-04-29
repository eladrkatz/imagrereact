export function imagesHaveErrored(bool) {
    return {
        type: 'IMAGES_HAVE_ERRORED',
        hasErrored: bool
    };
}

export function imagesAreLoading(bool) {
    return {
        type: 'IMAGES_ARE_LOADING',
        isLoading: bool
    };
}

export function imagesFetchDataSuccess(imageResults) {
    return {
        type: 'IMAGES_FETCH_DATA_SUCCESS',
        imageResults
    };
}

export function imagesFetchData(url) {
    return (dispatch) => {
        dispatch(imagesAreLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(imagesAreLoading(false));

                return response;
            })
            .then((response) => response.json())
            //.then((result) => dispatch(imagesFetchDataSuccess(result.hits)))
            .then((result) => dispatch(imagesFetchDataSuccess(result.photos.photo)))
            .catch(() => dispatch(imagesHaveErrored(true)));
    };
}
