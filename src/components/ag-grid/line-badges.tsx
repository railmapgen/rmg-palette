import { HStack } from '@chakra-ui/react';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { RmgLineBadge } from '@railmapgen/rmg-components';
import useTranslatedName from '../hooks/use-translated-name';
import usePalette from '../hooks/use-palette';

interface LineBadgesProps {
    city: string;
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
