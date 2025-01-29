import classes from './rm-window.module.css';
import { Flex, FlexProps } from '@mantine/core';

export default function RMWindow({ classNames, ...others }: FlexProps) {
    return <Flex className="rm-window" classNames={{ root: classes.root, ...classNames }} {...others} />;
}
