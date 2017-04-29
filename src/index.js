import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import ItemList from './components/ItemList';
import SearchElement from './components/SearchElement';

const store = configureStore();

render(
    <Provider store={store}>
        <div>
            <SearchElement />
        </div>
    </Provider>,
    document.getElementById('app')
);

            // <ItemList />
