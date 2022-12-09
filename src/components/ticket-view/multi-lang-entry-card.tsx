import { RmgCard, RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';

import { Box, HStack, IconButton } from '@chakra-ui/react';
import { LanguageCode } from '@railmapgen/rmg-palette-resources';
import { MdAdd, MdDelete } from 'react-icons/md';
import { EntityId, EntityState } from '@reduxjs/toolkit';
import { TranslationEntity, translationEntityAdapter, translationEntitySelector } from '../../redux/ticket/util';
import { useTranslation } from 'react-i18next';

interface MultiLangEntryCardProps {
    entries?: EntityState<TranslationEntity>;
    onUpdate: (id: EntityId, changes: Partial<TranslationEntity>) => void;
    onAdd: (lang: LanguageCode) => void;
    onRemove: (id: EntityId) => void;
}

export default function MultiLangEntryCard(props: MultiLangEntryCardProps) {
    const { onUpdate, onAdd, onRemove } = props;
    const entries = props.entries ?? translationEntityAdapter.getInitialState();

    const { t } = useTranslation();

    const getFields = (id: EntityId): RmgFieldsField[] => {
        const entity = translationEntitySelector.selectById(entries, id);

        if (!entity) {
            return [];
        }

        const { lang, name } = entity;
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
                label: t('Language'),
                value: lang,
                options: languageOptions,
                onChange: value => onUpdate(id, { lang: value as LanguageCode }),
            },
            {
                type: 'input',
                label: t('Name'),
                value: name,
                onChange: value => onUpdate(id, { name: value }),
                validator: value => value !== '',
            },
        ];
    };

    const handleAddEntry = () => {
        const lang = Object.values(LanguageCode).filter(
            l => !Object.values(entries.entities).find(entity => entity?.lang === l)
        )[0];
        onAdd(lang);
    };

    return (
        <RmgCard direction="column">
            {translationEntitySelector.selectIds(entries).map((id, i) => (
                <HStack key={id} sx={{ '& > div:first-of-type': { flex: 1 } }} data-testid={'entry-card-stack-' + id}>
                    <RmgFields fields={getFields(id)} noLabel={i > 0} />

                    {i === entries.ids.length - 1 ? (
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

                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label={t('Remove this name')}
                        title={t('Remove this name')}
                        onClick={() => onRemove(id)}
                        icon={<MdDelete />}
                    />
                </HStack>
            ))}
        </RmgCard>
    );
}
