import React, { ReactNode } from 'react';
import { useRootSelector } from '../../redux';
import { useDispatch } from 'react-redux';
import { RmgSidePanel, RmgSidePanelHeader, RmgSidePanelProps } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import { closeSidePanel } from '../../redux/app/app-slice';

const SIDE_PANEL_WIDTH = 410;

export default function SidePanel() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { sidePanelCity } = useRootSelector(state => state.app);

    const handleClose = () => {
        dispatch(closeSidePanel());
    };

    return (
        <RmgSidePanel isOpen={!!sidePanelCity} width={SIDE_PANEL_WIDTH} header="Dummy header">
            <RmgSidePanelHeader onClose={handleClose}>{sidePanelCity}</RmgSidePanelHeader>
        </RmgSidePanel>
    );
}
