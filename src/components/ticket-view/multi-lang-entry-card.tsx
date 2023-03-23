import { RmgCard, RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { Box, HStack, IconButton, SystemStyleObject } from '@chakra-ui/react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { TranslationEntry } from '../../redux/ticket/util';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_NAMES, LanguageCode } from '@railmapgen/rmg-translate';
import useTranslatedName from '../hooks/use-translated-name';

interface MultiLangEntryCardProps {
    entries?: TranslationEntry[];
    onUpdate: (lang: LanguageCode, name: string) => void;
    onLangSwitch: (prevLang: LanguageCode, nextLang: LanguageCode) => void;
    onRemove: (lang: LanguageCode) => void;
}

const cardRowStyles: SystemStyleObject = {
    '& > div:first-of-type': {
        flex: 1,
    },
};

export default function MultiLangEntryCard(props: MultiLangEntryCardProps) {
    const { onUpdate, onLangSwitch, onRemove } = props;
    const entries = props.entries ?? [];

    const { t } = useTranslation();
    const translateName = useTranslatedName();

    const getFields = (lang: LanguageCode, name: string): RmgFieldsField[] => {
        return [
            {
                type: 'select',
                label: t('Language'),
                value: lang,
                options: Object.entries(LANGUAGE_NAMES).reduce(
                    (acc, cur) => ({
                        ...acc,
                        [cur[0]]: translateName(cur[1]),
                    }),
                    {} as Record<LanguageCode, string>
                ),
                disabledOptions: entries.filter(entry => entry[0] !== lang).map(entry => entry[0]),
                onChange: value => onLangSwitch(lang, value as LanguageCode),
            },
            {
                type: 'input',
                label: t('Name'),
                value: name,
                onChange: value => onUpdate(lang, value),
                validator: value => !!value,
            },
        ];
    };

    const handleAddEntry = () => {
        const nextLang = Object.keys(LANGUAGE_NAMES).filter(
            l => !entries.find(entry => entry[0] === l)
        )[0] as LanguageCode;
        onUpdate(nextLang, '');
    };

    return (
        <RmgCard direction="column">
            {entries.map(([lang, name], idx, arr) => (
                <HStack key={idx} sx={cardRowStyles} data-testid={'entry-card-stack-' + lang}>
                    <RmgFields fields={getFields(lang as LanguageCode, name)} noLabel={idx > 0} />
                    {idx === arr.length - 1 ? (
                        <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label={t('Add a name in another language')}
                            title={t('Add a name in another language')}
                            onClick={handleAddEntry}
                            icon={<MdAdd />}
                        />
                    ) : (
                        <Box minW={8} />
                    )}

                    {arr.length > 1 && (
                        <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label={t('Remove this name')}
                            title={t('Remove this name')}
                            onClick={() => onRemove(lang as LanguageCode)}
                            icon={<MdDelete />}
                        />
                    )}
                </HStack>
            ))}
        </RmgCard>
    );
}
