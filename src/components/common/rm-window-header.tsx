import classes from './rm-window-header.module.css';
import { Flex, FlexProps } from '@mantine/core';

export default function RMWindowHeader({ classNames, ...others }: FlexProps) {
    return <Flex className="rm-window-header" classNames={{ root: classes.root, ...classNames }} {...others}></Flex>;
}
