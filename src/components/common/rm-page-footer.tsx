import classes from './rm-page-footer.module.css';
import { Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';

export default function RMPageFooter({ className, ...others }: FlexProps) {
    return <Flex className={clsx('rmg-page__footer', classes.root, className)} {...others} />;
}
