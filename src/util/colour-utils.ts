import { ColourHex } from '@railmapgen/rmg-palette-resources';

export const toRgb = (hex: ColourHex): [number, number, number] => {
    const [, rHex, gHex, bHex] = hex.match(/^#(\w{2})(\w{2})(\w{2})$/) ?? [];
    return [Number('0x' + rHex), Number('0x' + gHex), Number('0x' + bHex)];
};
