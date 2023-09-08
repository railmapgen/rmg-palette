import { RmgPage } from '@railmapgen/rmg-components';
import ColourModal from './colour-modal';
import { useEffect, useRef, useState } from 'react';
import { Events } from '../../util/constants';
import { useSearchParams } from 'react-router-dom';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Theme } from '@railmapgen/rmg-palette-resources';
import { useRootDispatch } from '../../redux';
import { addRecentlyUsed } from '../../redux/app/app-slice';

const CHANNEL_PREFIX = 'rmg-palette-bridge--';

export default function PickerView() {
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get('parentId');
    const parentComponent = searchParams.get('parentComponent');

    const dispatch = useRootDispatch();

    const [sessionId, setSessionId] = useState<string>();
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
                setSessionId(crypto.randomUUID());
                setTheme(data);
            }
        };

        console.log(`[${channel.name}] App clip connection established, parentComponent=${parentComponent}`);

        // reset window header margin
        const styleEl = document.createElement('style');
        styleEl.textContent = `.rmg-window__header{margin-left: unset;}`;
        document.head.appendChild(styleEl);

        // post loaded event
        channel.postMessage({ event: 'LOADED' });

        return () => {
            channel.close();
            document.head.removeChild(styleEl);
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
        <RmgPage>
            <ColourModal defaultTheme={theme} sessionId={sessionId} onSubmit={handleSubmit} onClose={handleClose} />
        </RmgPage>
    );
}
