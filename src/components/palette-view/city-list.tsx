import classes from './city-list.module.css';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { useRootSelector } from '../../redux';
import { Accordion, ActionIcon, Center } from '@mantine/core';
import PaletteCards from './palette-cards';
import { MdEdit } from 'react-icons/md';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';

export default function CityList() {
    const { t } = useTranslation();
    const translateName = useTranslatedName();

    const { cityList, selectedCountry } = useRootSelector(state => state.app);
    const cities = cityList.filter(city => city.country === selectedCountry);

    const handleCityEdit = async (cityCode: string) => {
        rmgRuntime.closeApp('rmg-palette-upload');
        setTimeout(() => {
            rmgRuntime.openApp({ appId: 'rmg-palette-upload', hash: '/new?city=' + cityCode });
        }, 200);
        rmgRuntime.event(Events.EDIT_CITY, { city: cityCode });
    };

    return (
        <Accordion chevronPosition="left" classNames={{ root: classes.root }}>
            {cities.map(city => (
                <Accordion.Item key={city.id} value={city.id}>
                    <Center className={classes.control}>
                        <Accordion.Control>{translateName(city.name)}</Accordion.Control>
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
            ))}
        </Accordion>
    );
}
