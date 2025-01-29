import classes from './rm-page-header.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMPageHeader({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-page__header', classes.root, className)} {...others} />;
}
