import { render } from '../../test-utils';
import TicketView from './ticket-view';
import { TicketState } from '../../redux/ticket/ticket-slice';
import rootReducer from '../../redux';
import { CountryCode, MonoColour } from '../../../package/lib';
import { DRAFT_TICKET_KEY } from '../../util/constants';
import { act, fireEvent, screen } from '@testing-library/react';
import { createMockRootStore } from '../../setupTests';

const realStore = rootReducer.getState();
const mockStore = createMockRootStore({ ...realStore });

describe('TicketView', () => {
    const draftTicket: TicketState = {
        ...realStore.ticket,
        country: CountryCode.HK,
        city: 'hongkong',
        lines: {
            'id-001': {
                id: '',
                nameEntity: [],
                colour: '#aaaaaa',
                fg: MonoColour.white,
            },
        },
    };

    afterEach(() => {
        mockStore.clearActions();
        window.localStorage.clear();
    });

    it('Can apply draft ticket as expected', async () => {
        window.localStorage.setItem(DRAFT_TICKET_KEY, JSON.stringify(draftTicket));

        render(<TicketView />, { store: mockStore });
        await screen.findByRole('dialog');

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
        });

        const actions = mockStore.getActions();
        expect(actions).toHaveLength(1);
        expect(actions).toContainEqual({
            type: 'ticket/resetTicket',
            payload: expect.objectContaining({ city: 'hongkong' }),
        });

        expect(window.localStorage.getItem(DRAFT_TICKET_KEY)).not.toBeNull();
    });

    it('Can discard draft ticket as expected', async () => {
        window.localStorage.setItem(DRAFT_TICKET_KEY, JSON.stringify(draftTicket));

        render(<TicketView />, { store: mockStore });
        await screen.findByRole('dialog');

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
        });

        const actions = mockStore.getActions();
        expect(actions).toHaveLength(0);

        expect(window.localStorage.getItem(DRAFT_TICKET_KEY)).toBeNull();
    });

    it('Can render ticket as expected', done => {
        render(<TicketView />);

        // no dialog pops up
        screen.findByRole('dialog').catch(done);
    });
});
