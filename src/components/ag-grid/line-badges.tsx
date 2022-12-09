import { HStack } from '@chakra-ui/react';
import { CityCode, MonoColour, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { useEffect, useState } from 'react';
import { RmgLineBadge } from '@railmapgen/rmg-components';
import useTranslatedName from '../hooks/use-translated-name';

const usePalette = (cityCode?: CityCode) => {
    const [paletteList, setPaletteList] = useState<PaletteEntry[]>([]);

    useEffect(() => {
        import(`../../../node_modules/@railmapgen/rmg-palette-resources/palettes/${cityCode}.js`)
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
    const translateName = useTranslatedName();

    return (
        <HStack flexWrap="wrap" sx={{ '& .chakra-badge': { mb: 1 } }}>
            {paletteList.map(line => (
                <RmgLineBadge
                    key={line.id}
                    name={translateName(line.name)}
                    fg={line.fg || MonoColour.white}
                    bg={line.colour}
                />
            ))}
        </HStack>
    );
}
