import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";


import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./actions/post.actions";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <Provider store={store}>
            < App />
        </Provider>
    </React.StrictMode>
);
