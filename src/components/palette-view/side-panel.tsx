import { useRootSelector } from '../../redux';
import { useDispatch } from 'react-redux';
import { RmgSidePanel, RmgSidePanelHeader } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import { closeSidePanel } from '../../redux/app/app-slice';
import usePalette from '../hooks/use-palette';
import LineDetailCard from '../line-detail-card';
import { TranslationEntry } from '../../redux/ticket/util';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { Button, Divider, HStack, VStack } from '@chakra-ui/react';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import useTranslatedName from '../hooks/use-translated-name';

const SIDE_PANEL_WIDTH = 410;

export default function SidePanel() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { sidePanelCity, cityList } = useRootSelector(state => state.app);
    const paletteList = usePalette(sidePanelCity);

    const translateName = useTranslatedName();
    const displayName = translateName(cityList.find(city => city.id === sidePanelCity)?.name ?? {});

    const handleClose = () => {
        dispatch(closeSidePanel());
    };

    const handleCityEdit = async () => {
        rmgRuntime.closeApp('rmg-palette-upload');
        setTimeout(() => {
            rmgRuntime.openApp('rmg-palette-upload', '/rmg-palette/#/new?city=' + sidePanelCity);
        }, 200);
        rmgRuntime.event(Events.EDIT_CITY, { city: sidePanelCity });
    };

    return (
        <RmgSidePanel isOpen={!!sidePanelCity} width={SIDE_PANEL_WIDTH} header="Dummy header">
            <RmgSidePanelHeader onClose={handleClose}>{displayName}</RmgSidePanelHeader>

            <VStack spacing={0.5} px={2} flex={1} overflowY="auto">
                {paletteList.map(line => {
                    const lineDetail = {
                        ...line,
                        nameEntity: Object.entries(line.name) as TranslationEntry[],
                        fg: line.fg ?? MonoColour.white,
                    };
                    return <LineDetailCard key={line.id} lineDetail={lineDetail} editable={false} />;
                })}
            </VStack>

            <Divider />
            <HStack p={1}>
                <Button size="sm" ml="auto" onClick={handleCityEdit}>
                    {t('Edit')}
                </Button>
            </HStack>
        </RmgSidePanel>
    );
}
