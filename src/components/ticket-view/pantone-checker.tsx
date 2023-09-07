import { useEffect } from 'react';
import { getRGBByPantone } from '../../service/pantone-service';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootSelector } from '../../redux';
import { setPantoneReady } from '../../redux/ticket/ticket-slice';

export default function PantoneChecker() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

    const { pantoneReady } = useRootSelector(state => state.ticket);

    useEffect(() => {
        const controller = new AbortController();
        getRGBByPantone('130 C', controller.signal)
            .then(hex => dispatch(setPantoneReady(!!hex)))
            .catch(() => dispatch(setPantoneReady(false)));

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Text as="i" fontSize="xs">
            {pantoneReady === undefined
                ? t('Checking Pantone service availability...')
                : pantoneReady
                ? t('Pantone service is ready') + ' ✅'
                : t('Pantone service is not available') + ' ⚠️'}
        </Text>
    );
}
