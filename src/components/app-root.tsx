import React, { useEffect, useState } from 'react';
import { cityList, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { Image } from '@chakra-ui/react';

export default function AppRoot() {
    const [lineList, setLineList] = useState<PaletteEntry[]>([]);

    useEffect(() => {
        import('@railmapgen/rmg-palette-resources/palettes/guangzhou')
            .then(module => module.default)
            .then(list => setLineList(list as any));
    }, []);

    console.log(lineList);

    return (
        <div>
            <h1>RMG Palette</h1>

            <ul>
                {cityList.map(city => (
                    <li key={city.id}>
                        <Image src={city.flagSvg} h={20} />
                        {city.flagEmoji + ' ' + city.name.en}
                    </li>
                ))}
            </ul>

            <ul>
                {lineList.map(line => (
                    <div key={line.id}>{line.name.en}</div>
                ))}
            </ul>
        </div>
    );
}
