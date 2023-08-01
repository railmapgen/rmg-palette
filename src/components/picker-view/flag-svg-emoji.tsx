import React from 'react';
import { Image } from '@chakra-ui/react';

interface FlagSvgEmojiProps {
    countryCode: string;
    svgFilename?: string;
}

export default function FlagSvgEmoji(props: FlagSvgEmojiProps) {
    const { countryCode, svgFilename } = props;

    return svgFilename ? (
        <Image
            src={`/rmg-palette/resources/flags/${svgFilename.slice(0, -4)}.svg`}
            alt={`Flag of ${countryCode}`}
            h={17}
            mr={1}
        />
    ) : (
        <></>
    );
}
