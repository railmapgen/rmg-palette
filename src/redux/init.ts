import { addRootListener, RootStore } from './index';
import { DRAFT_TICKET_KEY, RECENTLY_USED_KEY } from '../util/constants';
import { getTicketByCityId } from './ticket/util';
import { populateTicket } from './ticket/ticket-slice';
import rmgRuntime, { logger } from '@railmapgen/rmg-runtime';
import { PaletteUsage, setRecentlyUsed } from './app/app-slice';
import { updateTheme } from '@railmapgen/rmg-palette-resources';

const initRecentlyUsed = async (store: RootStore) => {
    try {
        const recentlyUsedStr = rmgRuntime.storage.get(RECENTLY_USED_KEY);

        if (recentlyUsedStr !== null) {
            const recentlyUsed: PaletteUsage[] = JSON.parse(recentlyUsedStr);
            const updatedUsage: PaletteUsage[] = await Promise.all(
                recentlyUsed.map(async usage => ({ ...usage, theme: await updateTheme(usage.theme) }))
            );
            store.dispatch(setRecentlyUsed(updatedUsage));
        }
    } catch (e) {
        logger.warn('initRecentlyUsed(), error reading usage history, initiating as empty', e);
    }
};

const openTicketByCity = async (store: RootStore) => {
    const hash = window.location.hash;
    if (hash.startsWith('#/new')) {
        const searchParams = new URLSearchParams(hash.slice('#/new'.length));
        const cityId: any = searchParams.get('city');
        logger.info(`openTicketByCity(), searchParams city=${cityId}`);

        if (cityId) {
            const ticket = await getTicketByCityId(cityId);
            if (ticket) {
                store.dispatch(populateTicket(ticket));
            }
        }

        // clear search
        const ticketUrl = '/rmg-palette/#/new';
        window.history.replaceState({}, document.title, ticketUrl);
        rmgRuntime.updateAppMetadata({ hash: '/new' });
    }
};

export const initPickerState = async (store: RootStore) => {
    const hash = window.location.hash;
    if (hash.startsWith('#/picker')) {
        await initRecentlyUsed(store);

        // listen to recently used change (this instance)
        store.dispatch(
            addRootListener({
                predicate: (action, currentState, previousState) => {
                    const { type } = action;
                    return (
                        (type === 'app/addRecentlyUsed' ||
                            type === 'app/removeRecentlyUsedItem' ||
                            type === 'app/clearRecentlyUsed') &&
                        JSON.stringify(currentState.app.recentlyUsed) !== JSON.stringify(previousState.app.recentlyUsed)
                    );
                },
                effect: (action, listenApi) => {
                    rmgRuntime.storage.set(RECENTLY_USED_KEY, JSON.stringify(listenApi.getState().app.recentlyUsed));
                },
            })
        );

        // listen to recently used change (other instance)
        rmgRuntime.storage.on(RECENTLY_USED_KEY, data => {
            if (data) {
                store.dispatch(setRecentlyUsed(JSON.parse(data)));
            }
        });
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
                rmgRuntime.storage.set(DRAFT_TICKET_KEY, JSON.stringify(listenerApi.getState().ticket));
            },
        })
    );

    await openTicketByCity(store);
};
