import { getPalette, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { useEffect, useState } from 'react';

export default function usePalette(cityCode?: string) {
    const [paletteList, setPaletteList] = useState<PaletteEntry[]>([]);

    useEffect(() => {
        if (!cityCode) {
            setPaletteList([]);
            return;
        }

        const controller = new AbortController();

        getPalette(cityCode, controller.signal)
            .then(data => setPaletteList(data))
            .catch(() => setPaletteList([]));

        return () => {
            controller.abort();
        };
    }, [cityCode]);

    return paletteList;
}
