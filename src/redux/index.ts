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
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
export type RootStore = typeof store;

export type RootDispatch = typeof store.dispatch;
export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const addRootListener = addListener as TypedAddListener<RootState, RootDispatch>;

export default store;

(window as any).xyStore = store;
