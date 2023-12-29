import { useEffect } from 'react';
import { getRGBByPantone } from '../../service/pantone-service';
import { Text, TextProps } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootSelector } from '../../redux';
import { setPantoneReady } from '../../redux/app/app-slice';

export default function PantoneChecker(props: TextProps) {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

    const { pantoneReady } = useRootSelector(state => state.app);

    useEffect(() => {
        if (pantoneReady) return;

        const controller = new AbortController();
        getRGBByPantone('130 C', controller.signal)
            .then(hex => dispatch(setPantoneReady(!!hex)))
            .catch(() => dispatch(setPantoneReady(false)));

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Text as="i" fontSize="xs" {...props}>
            {pantoneReady === undefined
                ? t('Checking Pantone® service availability...')
                : pantoneReady
                  ? t('Pantone® service is ready') + ' ✅'
                  : t('Pantone® service is not available') + ' ⚠️'}
        </Text>
    );
}
