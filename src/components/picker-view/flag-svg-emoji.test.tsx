import FlagSvgEmoji from './flag-svg-emoji';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';

describe('FlagSvgEmoji', () => {
    it('Can resolute expect src url for SVG version of emoji', async () => {
        render(<FlagSvgEmoji countryCode="HK" svgFilename="1F1ED-1F1F0.svg" />);

        await screen.findByAltText('Flag of HK');
        expect(screen.getByAltText('Flag of HK').getAttribute('src')).toBe(
            '/rmg-palette/resources/flags/1F1ED-1F1F0.svg'
        );
    });
});
