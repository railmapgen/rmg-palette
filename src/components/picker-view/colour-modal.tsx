import { Button, Divider, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CityPicker from './city-picker';
import ColourPicker from './colour-picker';
import { CityCode, ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { RmgFields, RmgFieldsField, RmgLineBadge } from '@railmapgen/rmg-components';
import { Theme } from '../../util/constants';

interface ColourModalProps {
    defaultTheme?: Theme;
    onSubmit?: (theme: Theme) => void;
    onClose: () => void;
}

export default function ColourModal(props: ColourModalProps) {
    const { defaultTheme, onSubmit, onClose } = props;

    const { t } = useTranslation();

    const [cityCode, setCityCode] = useState(defaultTheme?.[0]);
    const [lineCode, setLineCode] = useState(defaultTheme?.[1]);
    const [bgColour, setBgColour] = useState(defaultTheme?.[2] || '#AAAAAA');
    const [fgColour, setFgColour] = useState(defaultTheme?.[3] || MonoColour.white);

    useEffect(() => {
        if (defaultTheme) {
            setCityCode(defaultTheme[0]);
            setLineCode(defaultTheme[1]);
            setBgColour(defaultTheme[2]);
            setFgColour(defaultTheme[3]);
        }
    }, [defaultTheme?.toString()]);

    const paletteFields: RmgFieldsField[] = [
        {
            type: 'custom',
            label: t('City theme'),
            component: (
                <CityPicker
                    defaultValueId={cityCode}
                    onChange={value => {
                        setCityCode(value);
                        setLineCode(undefined);
                        setBgColour('#AAAAAA');
                        setFgColour(MonoColour.white);
                    }}
                />
            ),
        },
        {
            type: 'custom',
            label: t('Line theme'),
            component: (
                <ColourPicker
                    city={cityCode}
                    defaultValueId={lineCode}
                    onChange={(line, bg, fg) => {
                        setLineCode(line);
                        setBgColour(bg);
                        setFgColour(fg);
                    }}
                />
            ),
        },
    ];

    const customFields: RmgFieldsField[] = [
        {
            type: 'input',
            label: t('Background colour'),
            variant: 'color',
            value: bgColour,
            placeholder: '#F3D03E',
            onChange: value => {
                setCityCode(CityCode.Other);
                setLineCode('other');
                setBgColour(value as ColourHex);
            },
        },
        {
            type: 'select',
            label: t('Foreground colour'),
            value: fgColour,
            options: {
                [MonoColour.white]: t('White'),
                [MonoColour.black]: t('Black'),
            },
            onChange: value => {
                setCityCode(CityCode.Other);
                setLineCode('other');
                setFgColour(value as MonoColour);
            },
        },
    ];

    const isSubmitEnabled = cityCode && lineCode && bgColour && fgColour;

    const handleSubmit = () => {
        if (isSubmitEnabled) {
            onSubmit?.([cityCode, lineCode, bgColour, fgColour]);
        }
    };

    return (
        <>
            <VStack flex={1} mx={2}>
                <RmgLineBadge name={t('Example')} fg={fgColour} bg={bgColour} />

                <Tabs isFitted colorScheme="primary" w="100%" defaultIndex={cityCode === CityCode.Other ? 1 : 0}>
                    <TabList>
                        <Tab>{t('From palette')}</Tab>
                        <Tab>{t('Customise')}</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <RmgFields fields={paletteFields} />
                        </TabPanel>
                        <TabPanel>
                            <RmgFields fields={customFields} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>

            <Divider />

            <HStack p={2} justifyContent="flex-end">
                <Button size="sm" onClick={onClose}>
                    {t('Cancel')}
                </Button>
                <Button size="sm" colorScheme="primary" onClick={handleSubmit} isDisabled={!isSubmitEnabled}>
                    {t('Confirm')}
                </Button>
            </HStack>
        </>
    );
}
