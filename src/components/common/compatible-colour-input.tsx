import classes from './compatible-colour-input.module.css';
import { ActionIcon, ColorInput, ColorInputProps } from '@mantine/core';
import { MdOutlineColorize } from 'react-icons/md';
import { useRef } from 'react';

export default function CompatibleColourInput({ type, size, onChange, style, ...props }: ColorInputProps) {
    const colourInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={classes.wrapper}>
            <ColorInput
                type={type}
                size={size}
                onChange={onChange}
                style={style}
                withPicker={!!window.EyeDropper}
                rightSection={
                    window.EyeDropper ? undefined : (
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => {
                                colourInputRef.current?.click();
                                colourInputRef.current?.focus();
                            }}
                        >
                            <MdOutlineColorize />
                        </ActionIcon>
                    )
                }
                {...props}
            />
            <input
                ref={colourInputRef}
                type="color"
                onChange={({ currentTarget: { value } }) => onChange?.(value.toUpperCase())}
                {...props}
            />
        </div>
    );
}
