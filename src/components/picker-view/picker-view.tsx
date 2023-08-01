import { RmgPage } from '@railmapgen/rmg-components';
import ColourModal from './colour-modal';
import { useEffect, useRef, useState } from 'react';
import { Events, Theme } from '../../util/constants';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import rmgRuntime from '@railmapgen/rmg-runtime';

const CHANNEL_PREFIX = 'rmg-palette-bridge--';

export default function PickerView() {
    const { t } = useTranslation();

    const [searchParams] = useSearchParams();
    const parentId = searchParams.get('parentId');
    const parentComponent = searchParams.get('parentComponent');

    const [theme, setTheme] = useState<Theme>();

    const channelRef = useRef<BroadcastChannel>();

    useEffect(() => {
        // channel that talks to parent (RMP import modal, RMG Templates upload modal)
        const channel = new BroadcastChannel(CHANNEL_PREFIX + parentId);
        channelRef.current = channel;
        rmgRuntime.event(Events.APP_CLIP_VIEW_OPENED, { parentComponent });

        // listen to app clip show event
        channel.onmessage = ev => {
            const { event, data } = ev.data;
            console.log(`[${channel.name}] Received event from parent component:`, event);
            if (event === 'OPEN') {
                setTheme(data);
            }
        };

        console.log(`[${channel.name}] App clip connection established, parentComponent=${parentComponent}`);

        // reset window header margin
        const styleEl = document.createElement('style');
        styleEl.textContent = `.rmg-window__header{margin-left: unset;}`;
        document.head.appendChild(styleEl);

        return () => {
            channel.close();
            document.head.removeChild(styleEl);
        };
    }, []);

    const handleSubmit = (nextTheme: Theme) => {
        console.log(`[${channelRef.current?.name}] Emitting SELECT event, theme:`, nextTheme);
        channelRef.current?.postMessage({
            event: 'SELECT',
            data: nextTheme,
        });
        rmgRuntime.event(Events.APP_CLIP_VIEW_SELECT, { parentComponent, theme: nextTheme });
    };

    const handleClose = () => {
        console.log(`[${channelRef.current?.name}] Emitting CLOSE event`);
        channelRef.current?.postMessage({
            event: 'CLOSE',
        });
        rmgRuntime.event(Events.APP_CLIP_VIEW_CLOSED, { parentComponent });
    };

    return (
        <RmgPage>
            <ColourModal defaultTheme={theme} onSubmit={handleSubmit} onClose={handleClose} />
        </RmgPage>
    );
}
