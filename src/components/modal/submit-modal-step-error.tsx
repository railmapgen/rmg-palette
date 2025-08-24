import classes from './submit-modal.module.css';
import { INVALID_REASON, InvalidReasonType } from '../../util/constants';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { Button, Group, List, Stack, Text, Title } from '@mantine/core';

interface SubmitModalStepErrorProps {
    countryErrors: InvalidReasonType[];
    cityErrors: InvalidReasonType[];
    lineErrors: Record<string, InvalidReasonType[]>;
    onIgnore: () => void;
    onClose: () => void;
}

export default function SubmitModalStepError(props: SubmitModalStepErrorProps) {
    const { countryErrors, cityErrors, lineErrors, onIgnore, onClose } = props;

    const { t } = useTranslation();
    const { translateName } = useTranslatedName();

    return (
        <>
            <Stack gap="xs" className={classes['step-body']}>
                <Text>
                    {t('Your inputs contain the following errors. Please consider fixing it before submitting.')}
                </Text>

                {countryErrors.length > 0 && (
                    <>
                        <Title order={3} size="h5">
                            {t('Country/Region')}
                        </Title>
                        <List size="sm" withPadding aria-label="List of country errors">
                            {countryErrors.map((e, i) => (
                                <List.Item key={i}>{translateName(INVALID_REASON[e])}</List.Item>
                            ))}
                        </List>
                    </>
                )}

                {cityErrors.length > 0 && (
                    <>
                        <Title order={3} size="h5">
                            {t('City')}
                        </Title>
                        <List size="sm" withPadding aria-label="List of city errors">
                            {cityErrors.map((e, i) => (
                                <List.Item key={i}>{translateName(INVALID_REASON[e])}</List.Item>
                            ))}
                        </List>
                    </>
                )}

                {Object.values(lineErrors).flat().length > 0 && (
                    <>
                        <Title order={3} size="h5">
                            {t('Lines')}
                        </Title>
                        <List size="sm" withPadding aria-label="List of line errors">
                            {Object.entries(lineErrors).map(([item, errors]) => (
                                <List.Item key={item}>
                                    {item}
                                    <List size="sm" withPadding>
                                        {errors.map((e, i) => (
                                            <List.Item key={i}>{translateName(INVALID_REASON[e])}</List.Item>
                                        ))}
                                    </List>
                                </List.Item>
                            ))}
                        </List>
                    </>
                )}
            </Stack>
            <Group gap="sm" pt="xs">
                <Button variant="default" ml="auto" onClick={onClose}>
                    {t('Go back')}
                </Button>
                <Button onClick={onIgnore}>{t('Submit anyway')}</Button>
            </Group>
        </>
    );
}
