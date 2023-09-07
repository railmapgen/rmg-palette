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
