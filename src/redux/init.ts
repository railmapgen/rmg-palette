import { addRootListener, RootStore } from './index';
import { DRAFT_TICKET_KEY } from '../util/constants';
import { getTicketByCityId } from './ticket/util';
import { populateTicket } from './ticket/ticket-slice';
import rmgRuntime from '@railmapgen/rmg-runtime';

const openTicketByCity = async (store: RootStore) => {
    const pathname = window.location.pathname;
    if (pathname.endsWith('/new')) {
        const searchParams = new URLSearchParams(window.location.search);
        const cityId: any = searchParams.get('city');
        console.log(`openTicketByCity():: searchParams city=${cityId}`);

        if (cityId) {
            const ticket = await getTicketByCityId(cityId);
            if (ticket) {
                store.dispatch(populateTicket(ticket));
            }
        }

        // clear search
        window.history.replaceState({}, document.title, pathname);
        rmgRuntime.updateUrl(pathname);
    }
};

export const initStore = async (store: RootStore) => {
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

    await openTicketByCity(store);
};
