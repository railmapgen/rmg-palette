import { LanguageCode, Translation } from '@railmapgen/rmg-translate';

export enum MonoColour {
    black = '#000',
    white = '#fff',
}

export type ColourHex = `#${string}`;

export interface PaletteEntry {
    /**
     * ID of line.
     */
    id: string;
    /**
     * Key-value pairs of multilingual names of the line.
     */
    name: Translation;
    /**
     * Background colour (in #HEX).
     */
    colour: ColourHex;
    /**
     * Foreground colour. Mandatory field if foreground colour is black.
     */
    fg?: MonoColour;
    /**
     * Pantone colour. If defined, colour is converted with Pantone Color Finder (https://www.pantone.com/color-finder).
     */
    pantone?: string;
}

export interface CityEntry {
    /**
     * This should be CityCode.
     * But as its values may change at another push, change it to string and verify it at fly.
     */
    id: string; // replace me to CityCode, builder!
    /**
     * ISO 3166-1 alpha-2 country code. (For cities in Britain, append BS 6879 subdivision code. )
     */
    country: string;
    /**
     * Key-value pairs of multilingual names of the city.
     */
    name: Translation;
}

export interface CountryEntry {
    /**
     * ISO 3166-1 alpha-2 country code. (For cities in Britain, append BS 6879 subdivision code. )
     */
    id: string; // replace me to CountryCode, builder!
    /**
     * Key-value pairs of multilingual names of the country.
     */
    name: Translation;
    languages: LanguageCode[];
}

/**
 * Colour theme of line, derived from `LineEntry`.
 * @property 0 - city id
 * @property 1 - line id
 * @property 2 - background colour
 * @property 3 - foreground colour
 */
export type Theme = [string, string, ColourHex, MonoColour];
