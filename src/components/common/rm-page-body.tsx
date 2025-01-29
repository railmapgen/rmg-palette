import classes from './rm-page-body.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMPageBody({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-page__body', classes.root, className)} {...others} />;
}
