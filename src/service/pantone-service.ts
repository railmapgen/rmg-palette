import { ColourHex } from '@railmapgen/rmg-palette-resources';

const getQuery = (code: string) => `{ getColor(code:"${code}") { code, rgb { r g b }, hex, cmyk { c m y k } } }`;

export const getRGBByPantone = async (code: string, signal?: AbortSignal): Promise<ColourHex> => {
    const response = await fetch('https://4n6dg5ccsfct3lzfssu34boemq.appsync-api.us-east-1.amazonaws.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'da2-sa3lsp2tkzhj3c2ysxbdprl73e',
        },
        body: JSON.stringify({ query: getQuery(code) }),
        signal,
    });
    const data = await response.json();
    return ('#' + data.data.getColor.hex) as ColourHex;
};
