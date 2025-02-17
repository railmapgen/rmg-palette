import classes from '../common/palette-card.module.css';
import { Card, Code, Flex, Group, Text } from '@mantine/core';
import { toRgb } from '../../util/colour-utils';
import { PaletteEntry } from '../../../package/src';
import useTranslatedName from '../hooks/use-translated-name';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { useRootSelector } from '../../redux';

type PaletteCardProps = {
    line: PaletteEntry;
};

export default function PaletteCard({ line }: PaletteCardProps) {
    const { t } = useTranslation();
    const { translateName, otherOfficialNames } = useTranslatedName();

    const { countryList, selectedCountry } = useRootSelector(state => state.app);
    const country = countryList.find(({ id }) => id === selectedCountry);

    const fgColour = line.fg === MonoColour.black ? 'black' : 'white';

    return (
        <Card key={line.id} className={classes.card} withBorder>
            <Card.Section bg={line.colour} className={classes['card-section']} style={{ color: fgColour }}>
                <Text span>{translateName(line.name)}</Text>
                <Text span>{otherOfficialNames(line.name, country?.languages)}</Text>
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
