import classes from './rm-window-header.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

type RMWindowHeaderProps = {
    isAppClipHeader?: boolean;
} & FlexProps;

export default function RMWindowHeader({ isAppClipHeader, className, ...others }: RMWindowHeaderProps) {
    return (
        <Flex
            className={clsx(
                'rmg-window__header',
                isAppClipHeader && 'rmg-window__app-clip-header',
                classes.root,
                className
            )}
            {...others}
        ></Flex>
    );
}
