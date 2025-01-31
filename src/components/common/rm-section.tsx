import classes from './rm-section.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMSection({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-section', classes.root, className)} {...others} />;
}

export const RMSectionHeader = ({ className, ...others }: FlexProps) => {
    return <Flex className={clsx('rmg-section__header', classes.header, className)} {...others} />;
};

export const RMSectionBody = ({ className, ...others }: FlexProps) => {
    return <Flex className={clsx('rmg-section__body', classes.body, className)} {...others} />;
};
