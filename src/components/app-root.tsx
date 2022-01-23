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

    return (
        <div>
            <h1>RMG Palette</h1>

            <ul>
                {cityList.map(city => (
                    <li key={city.id}>
                        <FlagImage filename={city.flagSvg} />
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

interface FlagImageProps {
    filename: string;
}

const FlagImage = (props: FlagImageProps) => {
    const { filename } = props;

    const [flagUrl, setFlagUrl] = useState<string>();

    useEffect(() => {
        import('@railmapgen/rmg-palette-resources/flags/' + filename).then(module => module.default).then(setFlagUrl);
    }, []);

    return <Image src={flagUrl} h={20} />;
};
