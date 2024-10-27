import { RmgDebouncedInput } from '@railmapgen/rmg-components';
import { ColourHex } from '@railmapgen/rmg-palette-resources';
import { getRGBByPantone } from '../../service/pantone-service';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface PantoneInputProps {
    value: string;
    onChange: (value: string, hex: ColourHex) => void;
}

export default function PantoneInput(props: PantoneInputProps) {
    const { value, onChange } = props;

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

    const handlePantoneCodeInput = async (nextValue: string) => {
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
    };

    return (
        <RmgDebouncedInput
            defaultValue={pantoneCode}
            onDebouncedChange={handlePantoneCodeInput}
            delay={1500}
            isDisabled={isLoading}
        />
    );
}
