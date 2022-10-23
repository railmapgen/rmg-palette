import React from 'react';
import { render } from '../../test-utils';
import SubmitModal from './submit-modal';
import { fireEvent, screen } from '@testing-library/react';
import rootReducer from '../../redux';
import { createMockRootStore } from '../../setupTests';
import { CountryCode, LanguageCode, MonoColour } from '@railmapgen/rmg-palette-resources';
import { createTranslationEntityInitialState } from '../../redux/ticket/util';

const realStore = rootReducer.getState();

const mockCallbacks = {
    onClose: jest.fn(),
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

        // one click button is displayed if submit anyway button is clicked
        fireEvent.click(screen.getByRole('button', { name: 'Submit anyway' }));
        expect(screen.getByRole('button', { name: '1-click open issue' })).toBeInTheDocument();
    });

    it('Can display one click submit button if no errors', () => {
        const mockStore = createMockRootStore({
            ...realStore,
            ticket: {
                ...realStore.ticket,
                country: CountryCode.HK,
                city: 'hongkong',
                cityName: createTranslationEntityInitialState([
                    { id: '001', lang: LanguageCode.English, name: 'Hong Kong' },
                    { id: '002', lang: LanguageCode.Chinese, name: '香港' },
                ]),
                lines: {
                    '991': {
                        id: 'ktl',
                        nameEntity: createTranslationEntityInitialState([
                            { id: '801', lang: LanguageCode.English, name: 'Kwun Tong Line' },
                            { id: '802', lang: LanguageCode.ChineseSimp, name: '观塘线' },
                            { id: '803', lang: LanguageCode.ChineseTrad, name: '觀塘綫' },
                        ]),
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

        // one click button is displayed
        expect(screen.getByRole('button', { name: '1-click open issue' })).toBeInTheDocument();
    });
});
