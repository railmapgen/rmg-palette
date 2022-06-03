import { RmgCard, RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import React from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { LanguageCode, Translation } from '@railmapgen/rmg-palette-resources';
import { MdAdd, MdDelete } from 'react-icons/md';

interface MultiLangEntryCardProps {
    entries: Translation;
    onLanguageChange: (prevLang: LanguageCode, nextLang: LanguageCode) => void;
    onUpdate: (lang: LanguageCode, name: string) => void;
    onRemove: (lang: LanguageCode) => void;
}

export default function MultiLangEntryCard(props: MultiLangEntryCardProps) {
    const { entries, onLanguageChange, onUpdate, onRemove } = props;

    const getFields = (lang: string, name: string): RmgFieldsField[] => {
        const languageOptions = Object.entries(LanguageCode).reduce<Record<string, string>>((acc, cur) => {
            if (cur[1] !== lang && cur[1] in entries) {
                return acc;
            } else {
                return { ...acc, [cur[1]]: cur[0] };
            }
        }, {});

        return [
            {
                type: 'select',
                label: 'Language',
                value: lang,
                options: languageOptions,
                onChange: value => onLanguageChange(lang as LanguageCode, value as LanguageCode),
            },
            {
                type: 'input',
                label: 'Name',
                value: name,
                onChange: value => onUpdate(lang as LanguageCode, value),
            },
        ];
    };

    const handleAddEntry = () => {
        const lang = Object.values(LanguageCode).filter(l => !(l in entries))[0];
        onUpdate(lang, '');
    };

    return (
        <RmgCard direction="column">
            {Object.entries(entries).map(([lang, name], i) => (
                <HStack key={lang} sx={{ '& > div:first-of-type': { flex: 1 } }}>
                    <RmgFields fields={getFields(lang, name)} noLabel={i > 0} />

                    {i === Object.keys(entries).length - 1 ? (
                        <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label="Add name in another language"
                            onClick={handleAddEntry}
                            icon={<MdAdd />}
                        />
                    ) : (
                        <Box minW={8} />
                    )}

                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="Remove name"
                        onClick={() => onRemove(lang as LanguageCode)}
                        icon={<MdDelete />}
                    />
                </HStack>
            ))}
        </RmgCard>
    );
}
