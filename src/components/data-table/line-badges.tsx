import { HStack } from '@chakra-ui/react';
import RmgLineBadge from '../common/rmg-line-badge';
import { MonoColour } from '../../util/constants';
import { CityCode, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import React, { useEffect, useState } from 'react';

const usePalette = (cityCode?: CityCode) => {
    const [paletteList, setPaletteList] = useState<PaletteEntry[]>([]);

    useEffect(() => {
        import(/* webpackChunkName: "palettes" */ `@railmapgen/rmg-palette-resources/palettes/${cityCode}.js`)
            .then(module => setPaletteList(module.default))
            .catch(() => setPaletteList([]));
    }, [cityCode]);

    return paletteList;
};

interface LineBadgesProps {
    city: CityCode;
}

export default function LineBadges(props: LineBadgesProps) {
    const { city } = props;
    const paletteList = usePalette(city);
    return (
        <HStack flexWrap="wrap">
            {paletteList.map(line => (
                <RmgLineBadge
                    key={line.id}
                    name={line.name.en!}
                    fg={line.fg || MonoColour.white}
                    bg={line.colour}
                ></RmgLineBadge>
            ))}
        </HStack>
    );
}
