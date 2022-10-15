import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import { cartReducer } from "./cart/cart.reducer";


const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, cartReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
    );
    
const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
    
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
    
export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
  );


export const persistor = persistStore(store);