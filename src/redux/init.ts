import { addRootListener, RootStore } from './index';
import { DRAFT_TICKET_KEY } from '../util/constants';

export const initStore = (store: RootStore) => {
    // listen to ticket state change (save draft)
    store.dispatch(
        addRootListener({
            predicate: (action, currentState, previousState) => {
                const { type } = action;
                return (
                    type.indexOf('ticket/') === 0 &&
                    !type.includes('resetTicket') &&
                    !type.includes('populateTicket') &&
                    JSON.stringify(currentState.ticket) !== JSON.stringify(previousState.ticket)
                );
            },
            effect: (action, listenerApi) => {
                window.localStorage.setItem(DRAFT_TICKET_KEY, JSON.stringify(listenerApi.getState().ticket));
            },
        })
    );
};
