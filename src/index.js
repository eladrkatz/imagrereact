import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import ImageSearcher from './components/imageSearcher';
import css from './index.css';

const store = configureStore();

render(
    <Provider store={store}>
        <ImageSearcher />
    </Provider>,
    document.getElementById('app')
);

