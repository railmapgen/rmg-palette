import { render } from '../../test-utils';
import TicketView from './ticket-view';
import { TicketState } from '../../redux/ticket/ticket-slice';
import rootReducer, { RootStore } from '../../redux';
import { DRAFT_TICKET_KEY } from '../../util/constants';
import { act, fireEvent, screen } from '@testing-library/react';
import { createTestStore } from '../../setupTests';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import rmgRuntime from '@railmapgen/rmg-runtime';

const realStore = rootReducer.getState();
let mockStore: RootStore;

describe('TicketView', () => {
    const effectiveEmptyTicket: TicketState = {
        ...realStore.ticket,
        country: 'HK',
        city: 'hongkong',
        lines: {},
    };

    const draftTicket: TicketState = {
        ...realStore.ticket,
        country: 'HK',
        city: 'hongkong',
        lines: {
            'id-001': {
                id: 'twl',
                nameEntity: [],
                colour: '#aaaaaa',
                fg: MonoColour.white,
            },
        },
    };

    beforeAll(async () => {
        await rmgRuntime.ready();
        mockStore = createTestStore();
    });

    afterEach(() => {
        rmgRuntime.storage.clear();
    });

    it('Do not apply draft ticket if it is effectively empty', async () => {
        rmgRuntime.storage.set(DRAFT_TICKET_KEY, JSON.stringify(effectiveEmptyTicket));

        render(<TicketView />, { store: mockStore });
        try {
            await screen.findByRole('dialog');
            throw new Error('promise not expected to be resolved');
        } catch (e) {
            const error = e as Error;
            console.log('error occurs:', error.message);
            expect(error.message).toContain('Unable to find role="dialog"');
        }
    });

    it('Can apply draft ticket as expected', async () => {
        rmgRuntime.storage.set(DRAFT_TICKET_KEY, JSON.stringify(draftTicket));

        render(<TicketView />, { store: mockStore });
        await screen.findByRole('dialog');

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
        });

        expect(mockStore.getState().ticket.city).toBe('hongkong');
        expect(rmgRuntime.storage.get(DRAFT_TICKET_KEY)).not.toBeNull();
    });

    it('Can discard draft ticket as expected', async () => {
        rmgRuntime.storage.set(DRAFT_TICKET_KEY, JSON.stringify(draftTicket));

        const prevState = mockStore.getState().ticket;
        render(<TicketView />, { store: mockStore });
        await screen.findByRole('dialog');

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
        });

        expect(mockStore.getState().ticket).toEqual(prevState);
        expect(rmgRuntime.storage.get(DRAFT_TICKET_KEY)).toBeNull();
    });

    it('Can render ticket as expected', () =>
        new Promise(done => {
            render(<TicketView />);

            // no dialog pops up
            screen.findByRole('dialog').catch(done);
        }));
});
