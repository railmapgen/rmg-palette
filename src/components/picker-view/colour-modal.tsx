import classes from './colour-modal.module.css';
import { useEffect, useState } from 'react';
import CityPicker from './city-picker';
import ColourPicker from './colour-picker';
import { ColourHex, MonoColour, Theme } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { useRootSelector } from '../../redux';
import PantoneChecker from '../ticket-view/pantone-checker';
import RecentlyUsed from './recently-used';
import { Badge, Button, Divider, Flex, Group, Stack } from '@mantine/core';
import PantoneInput from '../common/pantone-input';
import { RMLabelledSegmentedControl, RMPageBody, RMPageFooter } from '@railmapgen/mantine-components';
import CompatibleColourInput from '../common/compatible-colour-input';

const hexValidator = (value: string): boolean => {
    return !!value.match(/^#[0-9a-fA-F]{6}$/);
};

interface ColourModalProps {
    defaultTheme?: Theme;
    sessionId?: string;
    onSubmit?: (theme: Theme, displayName?: string) => void;
    onClose: () => void;
}

export default function ColourModal(props: ColourModalProps) {
    const { defaultTheme, sessionId, onSubmit, onClose } = props;

    const { t } = useTranslation();
    const { pantoneReady } = useRootSelector(state => state.app);

    const [cityCode, setCityCode] = useState(defaultTheme?.[0]);
    const [lineCode, setLineCode] = useState(defaultTheme?.[1]);
    const [bgColour, setBgColour] = useState(defaultTheme?.[2] || '#AAAAAA');
    const [fgColour, setFgColour] = useState(defaultTheme?.[3] || MonoColour.white);
    const [pantoneCode, setPantoneCode] = useState('');
    const [colourMode, setColourMode] = useState<'rgb' | 'pantone'>('rgb');

    const resetPantoneInput = () => {
        setPantoneCode('');
        setColourMode(prevState => (prevState === 'pantone' ? 'rgb' : prevState));
    };

    useEffect(() => {
        if (sessionId && defaultTheme) {
            setCityCode(defaultTheme[0]);
            setLineCode(defaultTheme[1]);
            setBgColour(defaultTheme[2]);
            setFgColour(defaultTheme[3]);
            resetPantoneInput();
        }
    }, [sessionId, defaultTheme?.toString()]);

    const colourModeOptions = [
        { label: t('RGB'), value: 'rgb' },
        { label: t('Pantone®'), value: 'pantone', disabled: !pantoneReady },
    ];

    const fgOptions = [
        { label: t('Black'), value: MonoColour.black },
        { label: t('White'), value: MonoColour.white },
    ];

    const isSubmitEnabled = cityCode && lineCode && bgColour && fgColour && hexValidator(bgColour);

    const handleSubmit = () => {
        if (isSubmitEnabled) {
            // FIXME
            const displayName = `${cityCode} - ${lineCode}`;
            const lowerCasedBgColour = bgColour.toLowerCase() as ColourHex;
            onSubmit?.([cityCode, lineCode, lowerCasedBgColour, fgColour], displayName);
        }
    };

    const handleApply = (theme: Theme) => {
        setCityCode(theme[0]);
        setLineCode(theme[1]);
        setBgColour(theme[2]);
        setFgColour(theme[3]);
        resetPantoneInput();
    };

    return (
        <>
            <RMPageBody>
                <Stack className={classes.body}>
                    <Flex>
                        <Badge size="xl" radius="sm" color={bgColour} style={{ color: fgColour }}>
                            {t('Example')}
                        </Badge>
                    </Flex>

                    <Group w="100%" grow>
                        <CityPicker
                            defaultValueId={cityCode}
                            onChange={value => {
                                setCityCode(value);
                                setLineCode(undefined);
                                setBgColour('#AAAAAA');
                                setFgColour(MonoColour.white);
                            }}
                        />
                        <ColourPicker
                            city={cityCode}
                            defaultValueId={lineCode}
                            onChange={(line, bg, fg, pantone) => {
                                setLineCode(line);
                                setBgColour(bg);
                                setFgColour(fg);
                                if (pantone) setPantoneCode(pantone);
                            }}
                            onSubmit={handleSubmit}
                        />
                    </Group>

                    <PantoneChecker display="none" />
                    <Group w="100%" className={classes['custom-input-group']}>
                        <RMLabelledSegmentedControl
                            size="sm"
                            label={t('Input mode')}
                            data={colourModeOptions}
                            value={colourMode}
                            onChange={value => setColourMode(value as typeof colourMode)}
                        />
                        {colourMode === 'pantone' && (
                            <PantoneInput
                                value={pantoneCode}
                                onChange={(value, hex) => {
                                    setCityCode('other');
                                    setLineCode('other');
                                    setBgColour(hex);
                                    setPantoneCode(value);
                                }}
                            />
                        )}
                        {colourMode !== 'pantone' && (
                            <CompatibleColourInput
                                label={t('Background colour')}
                                value={bgColour}
                                onChange={value => {
                                    setCityCode('other');
                                    setLineCode('other');
                                    setBgColour(value as ColourHex);
                                    resetPantoneInput();
                                }}
                            />
                        )}

                        <RMLabelledSegmentedControl
                            size="sm"
                            label={t('Foreground colour')}
                            data={fgOptions}
                            value={fgColour}
                            onChange={value => {
                                setCityCode('other');
                                setLineCode('other');
                                setFgColour(value as MonoColour);
                            }}
                        />
                    </Group>

                    <RecentlyUsed onApply={handleApply} />
                </Stack>
            </RMPageBody>

            <Divider />

            <RMPageFooter>
                <Group ml="auto" gap="sm">
                    <Button variant="default" size="sm" onClick={onClose}>
                        {t('Cancel')}
                    </Button>
                    <Button variant="filled" size="sm" onClick={handleSubmit} disabled={!isSubmitEnabled}>
                        {t('Confirm')}
                    </Button>
                </Group>
            </RMPageFooter>
        </>
    );
}
