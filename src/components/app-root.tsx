import React from 'react';
import { cityList } from '@railmapgen/rmg-palette-resources/dist';
import Guangzhou from '@railmapgen/rmg-palette-resources/dist/palettes/guangzhou';

export default function AppRoot() {
    return (
        <div>
            <h1>RMG Palette</h1>

            <ul>
                {cityList.map(city => (
                    <li key={city.id}>{city.name.en}</li>
                ))}
            </ul>

            <ul>
                {Guangzhou.map(line => (
                    <div key={line.id}>{line.name.en}</div>
                ))}
            </ul>
        </div>
    );
}
