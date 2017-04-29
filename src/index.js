import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import SearchElement from './components/SearchElement';
import HistoryElement from './components/history';
import ImageResults from './components/imageResults';
import styles from './index.css';

const store = configureStore();

render(
    <Provider store={store}>
        <div>
            <HistoryElement />
            <SearchElement />
            <ImageResults />
        </div>
    </Provider>,
    document.getElementById('app')
);

