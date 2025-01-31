import classes from './rm-page.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMPage({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-page', classes.root, className)} {...others} />;
}

export const RMPageHeader = ({ className, ...others }: FlexProps) => {
    return <Flex className={clsx('rmg-page__header', classes.header, className)} {...others} />;
};

export const RMPageBody = ({ className, ...others }: FlexProps) => {
    return <Flex className={clsx('rmg-page__body', classes.body, className)} {...others} />;
};

export const RMPageFooter = ({ className, ...others }: FlexProps) => {
    return <Flex className={clsx('rmg-page__footer', classes.footer, className)} {...others} />;
};
