import fetch from 'node-fetch';

const getFlagEmojiCodePoints = (countryCode: string): string[] => {
    const chars = countryCode.toUpperCase().split('');
    if (chars.length === 2) {
        // normal country
        return chars.map(char => ((char.codePointAt(0) || 0) + 0x1f1a5).toString(16).toUpperCase());
    } else if (chars.length === 5) {
        // GBENG, GBSCT
        return [
            '1F3F4',
            ...chars.map(char => ((char.codePointAt(0) || 0) + 0xe0020).toString(16).toUpperCase()),
            'E007F',
        ];
    } else {
        return [];
    }
};

export const getFlagEmoji = (countryCode: string): string => {
    const codePoints = getFlagEmojiCodePoints(countryCode);

    return String.fromCodePoint(...codePoints.map(cp => parseInt(cp, 16)));
};

export const fetchFlagSvg = async (countryCode: string): Promise<string> => {
    const codePoints = getFlagEmojiCodePoints(countryCode);

    try {
        const response = await fetch(`https://openmoji.org/data/color/svg/${codePoints.join('-')}.svg`);
        const arrayBuffer = await response.arrayBuffer();
        return 'data:image/svg+xml;base64,' + Buffer.from(arrayBuffer).toString('base64');
    } catch (err) {
        console.error('Failed to fetch SVG emoji for ' + countryCode, err);
        return '';
    }
};
