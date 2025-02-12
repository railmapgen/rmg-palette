import { SimpleGrid } from '@mantine/core';
import usePalette from '../hooks/use-palette';
import PaletteCard from './palette-card';

type PaletteTableProps = {
    cityCode: string;
};

export default function PaletteCards({ cityCode }: PaletteTableProps) {
    const paletteList = usePalette(cityCode);

    return (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
            {paletteList.map(line => (
                <PaletteCard key={line.id} line={line} />
            ))}
        </SimpleGrid>
    );
}
