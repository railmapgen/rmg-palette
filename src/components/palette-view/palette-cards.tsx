import classes from './palette-cards.module.css';
import { Card, Code, Flex, Group, SimpleGrid, Text } from '@mantine/core';
import usePalette from '../hooks/use-palette';
import useTranslatedName from '../hooks/use-translated-name';
import { useTranslation } from 'react-i18next';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { toRgb } from '../../util/colour-utils';

type PaletteTableProps = {
    cityCode: string;
};

export default function PaletteCards({ cityCode }: PaletteTableProps) {
    const { t } = useTranslation();
    const translateName = useTranslatedName();
    const paletteList = usePalette(cityCode);

    return (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
            {paletteList.map(line => {
                const fgColour = line.fg === MonoColour.black ? 'black' : 'white';
                return (
                    <Card key={line.id} p="sm" withBorder>
                        <Card.Section bg={line.colour} p="sm" className={classes['card-section']}>
                            <Text span style={{ color: fgColour }}>
                                {translateName(line.name)}
                            </Text>
                        </Card.Section>
                        <Group gap="xs" mt="sm">
                            <Flex className={classes.output}>
                                <Text c="dimmed" size="sm" span>
                                    {t('HEX')}
                                </Text>
                                <Code>{line.colour.toUpperCase()}</Code>
                            </Flex>

                            <Flex className={classes.output}>
                                <Text c="dimmed" size="sm" span>
                                    {t('RGB')}
                                </Text>
                                <Code>{toRgb(line.colour).join(', ')}</Code>
                            </Flex>

                            {line.pantone && (
                                <Flex className={classes.output}>
                                    <Text c="dimmed" size="sm" span>
                                        {t('Pantone® code')}
                                    </Text>
                                    <Code>{line.pantone}</Code>
                                </Flex>
                            )}
                        </Group>
                    </Card>
                );
            })}
        </SimpleGrid>
    );
}
