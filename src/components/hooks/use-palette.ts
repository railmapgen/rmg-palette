import { PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { useEffect, useState } from 'react';

export default function usePalette(cityCode?: string) {
    const [paletteList, setPaletteList] = useState<PaletteEntry[]>([]);

    useEffect(() => {
        if (!cityCode) {
            return;
        }

        const controller = new AbortController();

        fetch(`/rmg-palette/resources/palettes/${cityCode}.json`, { signal: controller.signal })
            .then(res => res.json())
            .then(data => setPaletteList(data))
            .catch(() => setPaletteList([]));

        return () => {
            controller.abort();
        };
    }, [cityCode]);

    return paletteList;
}
