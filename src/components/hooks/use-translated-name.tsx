import { LanguageCode, Translation } from '@railmapgen/rmg-translate';
import { useTranslation } from 'react-i18next';

export default function useTranslatedName(): (name: Translation) => string {
    const { i18n } = useTranslation();

    return (name: Translation) => {
        return (
            i18n.languages.map(lang => name[lang as LanguageCode]).find(name => name !== undefined) ??
            name.en ??
            '(Translation Error)'
        );
    };
}
