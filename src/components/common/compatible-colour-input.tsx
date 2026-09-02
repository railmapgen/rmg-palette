import classes from './compatible-colour-input.module.css';
import { ActionIcon, ColorInput, ColorInputProps } from '@mantine/core';
import { MdOutlineColorize } from 'react-icons/md';
import { useRef } from 'react';

const isEyeDropperSupported = !!window.EyeDropper;

export default function CompatibleColourInput({ type, size, onChange, style, ...props }: ColorInputProps) {
    const colourInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={classes.wrapper}>
            {!isEyeDropperSupported && (
                <input
                    ref={colourInputRef}
                    type="color"
                    onChange={({ currentTarget: { value } }) => onChange?.(value.toUpperCase())}
                    {...props}
                />
            )}
            <ColorInput
                type={type}
                size={size}
                onChange={onChange}
                style={style}
                withPicker={isEyeDropperSupported}
                rightSection={
                    isEyeDropperSupported ? undefined : (
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
        </div>
    );
}
