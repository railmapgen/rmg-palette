import { render } from '../../test-utils';
import SubmitModal from './submit-modal';
import { fireEvent, screen } from '@testing-library/react';
import rootReducer from '../../redux';
import { createTestStore } from '../../setupTests';
import { MonoColour } from '@railmapgen/rmg-palette-resources';

const realStore = rootReducer.getState();

const mockCallbacks = {
    onClose: vi.fn(),
};

describe('SubmitModal', () => {
    it('Can list out errors as expected', () => {
        render(<SubmitModal isOpen={true} {...mockCallbacks} />);

        // errors are listed out
        expect(screen.getByRole('list', { name: 'List of country errors' })).toBeInTheDocument();
        expect(screen.getByRole('list', { name: 'List of city errors' })).toBeInTheDocument();
        expect(screen.getByRole('list', { name: 'List of line errors' })).toBeInTheDocument();

        // submit anyway button is displayed
        expect(screen.getByRole('button', { name: 'Submit anyway' })).toBeInTheDocument();

        // justification field is displayed if submit anyway button is clicked
        fireEvent.click(screen.getByRole('button', { name: 'Submit anyway' }));
        expect(screen.getByRole('textbox', { name: 'Justification' })).toBeInTheDocument();
    });

    it('Can display one click submit button if no errors', () => {
        const mockStore = createTestStore({
            ticket: {
                ...realStore.ticket,
                country: 'HK',
                city: 'hongkong',
                cityName: [
                    ['en', 'Hong Kong'],
                    ['zh-Hans', '香港'],
                    ['zh-Hant', '香港'],
                ],
                lines: {
                    '991': {
                        id: 'ktl',
                        nameEntity: [
                            ['en', 'Kwun Tong Line'],
                            ['zh-Hans', '观塘线'],
                            ['zh-Hant', '觀塘綫'],
                        ],
                        colour: '#AAAAAA',
                        fg: MonoColour.white,
                    },
                },
            },
        });
        render(<SubmitModal isOpen={true} {...mockCallbacks} />, { store: mockStore });

        // errors are not listed out
        expect(screen.queryByRole('list', { name: 'List of country errors' })).not.toBeInTheDocument();
        expect(screen.queryByRole('list', { name: 'List of city errors' })).not.toBeInTheDocument();
        expect(screen.queryByRole('list', { name: 'List of line errors' })).not.toBeInTheDocument();

        // submit anyway button is not displayed
        expect(screen.queryByRole('button', { name: 'Submit anyway' })).not.toBeInTheDocument();

        // justification field is displayed
        expect(screen.getByRole('textbox', { name: 'Justification' })).toBeInTheDocument();
    });
});
