import classes from './rm-window.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMWindow({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-window', classes.root, className)} {...others} />;
}
