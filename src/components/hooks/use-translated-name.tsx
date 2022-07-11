import { useTranslation } from 'react-i18next';
import { LanguageCode, Translation } from '@railmapgen/rmg-palette-resources';

export default function useTranslatedName(): (name: Translation) => string {
    const { i18n } = useTranslation();

    return (name: Translation) => {
        return (
            i18n.languages.map(lang => name[lang as LanguageCode]).find(name => name !== undefined) ??
            name[LanguageCode.English] ??
            '(Translation Error)'
        );
    };
}
