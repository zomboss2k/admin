import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { compose } from 'redux';
import reducers from './reducers';

const middleware = [...getDefaultMiddleware()];

// eslint-disable-next-line
const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: reducers(),
  middleware: [...middleware, ...getDefaultMiddleware()],
});

export default store;
