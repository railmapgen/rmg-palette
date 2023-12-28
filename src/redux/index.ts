import {
    addListener,
    combineReducers,
    configureStore,
    createListenerMiddleware,
    TypedAddListener,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer from './app/app-slice';
import ticketReducer from './ticket/ticket-slice';

const rootReducer = combineReducers({
    app: appReducer,
    ticket: ticketReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const listenerMiddleware = createListenerMiddleware();
export const createStore = (preloadedState: Partial<RootState> = {}) =>
    configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
        preloadedState,
    });
const store = createStore();
export type RootStore = typeof store;

export type RootDispatch = typeof store.dispatch;
export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const addRootListener = addListener as TypedAddListener<RootState, RootDispatch>;

export default store;

(window as any).rmgStore = store;
