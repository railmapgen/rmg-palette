import classes from './rm-window-header.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMWindowHeader({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-window__header', classes.root, className)} {...others}></Flex>;
}
