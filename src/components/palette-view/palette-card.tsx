import classes from '../common/palette-card.module.css';
import { Card, Code, Flex, Group, Text } from '@mantine/core';
import { toRgb } from '../../util/colour-utils';
import { PaletteEntry } from '../../../package/src';
import useTranslatedName from '../hooks/use-translated-name';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';

type PaletteCardProps = {
    line: PaletteEntry;
};

export default function PaletteCard({ line }: PaletteCardProps) {
    const { t } = useTranslation();
    const translateName = useTranslatedName();

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
}
