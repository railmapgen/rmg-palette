import { useEffect } from 'react';
import { getRGBByPantone } from '../../service/pantone-service';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface PantoneCheckerProps {
    ready?: boolean;
    onReady: (flag: boolean) => void;
}

export default function PantoneChecker(props: PantoneCheckerProps) {
    const { ready, onReady } = props;

    const { t } = useTranslation();

    useEffect(() => {
        const controller = new AbortController();
        getRGBByPantone('130 C', controller.signal)
            .then(hex => onReady(!!hex))
            .catch(() => onReady(false));

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Text as="i" fontSize="xs">
            {ready === undefined
                ? t('Checking Pantone service availability...')
                : ready
                ? t('Pantone service is ready') + ' ✅'
                : t('Pantone service is not available') + ' ⚠️'}
        </Text>
    );
}
