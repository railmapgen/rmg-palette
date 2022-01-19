import React from 'react';
import { cityList } from '@railmapgen/rmg-palette-resources';

export default function AppRoot() {
    return (
        <div>
            <h1>RMG Palette</h1>

            {cityList.map(city => (
                <div key={city.id}>{city.name.en}</div>
            ))}
        </div>
    );
}
