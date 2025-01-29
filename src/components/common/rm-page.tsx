import classes from './rm-page.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMPage({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-page', classes.root, className)} {...others} />;
}
