import React from 'react';
import { cityList } from '@railmapgen/rmg-palette-resources/dist';
import Guangzhou from '@railmapgen/rmg-palette-resources/dist/palettes/guangzhou.js';

export default function AppRoot() {
    return (
        <div>
            <h1>RMG Palette</h1>

            {cityList.map(city => (
                <div key={city.id}>{city.name.en}</div>
            ))}

            {Guangzhou.map(line => (
                <div key={line.id}>{line.name.en}</div>
            ))}
        </div>
    );
}
