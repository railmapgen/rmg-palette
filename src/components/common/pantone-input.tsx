import { ColourHex } from '@railmapgen/rmg-palette-resources';
import { getRGBByPantone } from '../../service/pantone-service';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Loader, TextInput, TextInputProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from '@mantine/hooks';

interface PantoneInputProps extends Omit<TextInputProps, 'onChange'> {
    value: string;
    onChange: (value: string, hex: ColourHex) => void;
}

export default function PantoneInput(props: PantoneInputProps) {
    const { value, onChange, ...others } = props;

    const { t } = useTranslation();

    const [pantoneCode, setPantoneCode] = useState(value);
    const [isLoading, setIsLoading] = useState(false);
    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        setPantoneCode(value);
    }, [value]);

    const handleSearch = useDebouncedCallback(async (nextValue: string) => {
        controllerRef.current.abort();

        controllerRef.current = new AbortController();
        setIsLoading(true);
        try {
            const hex = await getRGBByPantone(nextValue, controllerRef.current.signal);
            onChange(nextValue, hex);
            setPantoneCode(nextValue);
        } catch {
            console.warn(`[rmg-palette] Unable to find Pantone colour ${nextValue}`);
            // force update and reset
            flushSync(() => {
                setPantoneCode(nextValue);
            });
            setPantoneCode(value);
        } finally {
            setIsLoading(false);
        }
    }, 1500);

    const handleInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setPantoneCode(value);
        handleSearch(value);
    };

    return (
        <TextInput
            label={t('Pantone® code')}
            value={pantoneCode}
            onChange={handleInput}
            rightSection={isLoading && <Loader size={20} />}
            disabled={isLoading}
            {...others}
        />
    );
}
