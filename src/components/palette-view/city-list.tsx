import classes from './city-list.module.css';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { useRootSelector } from '../../redux';
import { Accordion, ActionIcon, Center, Text } from '@mantine/core';
import PaletteCards from './palette-cards';
import { MdEdit } from 'react-icons/md';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import { useRef } from 'react';

export default function CityList() {
    const { t } = useTranslation();
    const { translateName, otherOfficialNames } = useTranslatedName();

    const { cityList, countryList, selectedCountry } = useRootSelector(state => state.app);
    const country = countryList.find(({ id }) => id === selectedCountry);
    const cities = cityList.filter(city => city.country === selectedCountry);

    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleCitySelect = (id: string | null) => {
        if (id) {
            setTimeout(() => {
                itemRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }
    };

    const handleCityEdit = async (cityCode: string) => {
        rmgRuntime.closeApp('rmg-palette-upload');
        setTimeout(() => {
            rmgRuntime.openApp({ appId: 'rmg-palette-upload', hash: '/new?city=' + cityCode });
        }, 200);
        rmgRuntime.event(Events.EDIT_CITY, { city: cityCode });
    };

    return (
        <Accordion chevronPosition="left" classNames={{ root: classes.root }} onChange={handleCitySelect}>
            {cities.map(city => {
                itemRefs.current = {};
                return (
                    <Accordion.Item
                        key={city.id}
                        ref={current => {
                            itemRefs.current[city.id] = current;
                        }}
                        value={city.id}
                    >
                        <Center className={classes.control}>
                            <Accordion.Control>
                                {translateName(city.name)}
                                <Text span className={classes['official-names']}>
                                    {otherOfficialNames(city.name, country?.languages)}
                                </Text>
                            </Accordion.Control>
                            <ActionIcon
                                variant="default"
                                ml="xs"
                                mr="md"
                                aria-label={t('Edit')}
                                title={t('Edit')}
                                onClick={() => handleCityEdit(city.id)}
                            >
                                <MdEdit />
                            </ActionIcon>
                        </Center>
                        <Accordion.Panel>
                            <PaletteCards cityCode={city.id} />
                        </Accordion.Panel>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}
