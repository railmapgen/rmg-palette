import ColourModal from './colour-modal';
import { useEffect, useRef, useState } from 'react';
import { Events } from '../../util/constants';
import { useSearchParams } from 'react-router-dom';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Theme } from '@railmapgen/rmg-palette-resources';
import { useRootDispatch, useRootSelector } from '../../redux';
import { addRecentlyUsed } from '../../redux/app/app-slice';
import { RMPage } from '@railmapgen/mantine-components';
import { LoadingOverlay } from '@mantine/core';

const CHANNEL_PREFIX = 'rmg-palette-bridge--';

export default function PickerView() {
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get('parentId');
    const parentComponent = searchParams.get('parentComponent');

    const dispatch = useRootDispatch();
    const { isDataLoading } = useRootSelector(state => state.app);

    const [sessionId, setSessionId] = useState<string>();
    const [theme, setTheme] = useState<Theme>();

    const channelRef = useRef<BroadcastChannel>(null);

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
                setSessionId(crypto.randomUUID());
                setTheme(data);
            }
        };

        console.log(`[${channel.name}] App clip connection established, parentComponent=${parentComponent}`);

        // post loaded event
        channel.postMessage({ event: 'LOADED' });

        return () => {
            channel.close();
        };
    }, []);

    const handleSubmit = (nextTheme: Theme, displayName?: string) => {
        console.log(`[${channelRef.current?.name}] Emitting SELECT event, theme:`, nextTheme);
        channelRef.current?.postMessage({
            event: 'SELECT',
            data: nextTheme,
        });
        dispatch(addRecentlyUsed({ theme: nextTheme, displayName }));
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
        <RMPage>
            <LoadingOverlay visible={isDataLoading} />
            <ColourModal defaultTheme={theme} sessionId={sessionId} onSubmit={handleSubmit} onClose={handleClose} />
        </RMPage>
    );
}
