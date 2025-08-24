import { LanguageCode, Translation } from '@railmapgen/rmg-translate';
import { useTranslation } from 'react-i18next';

export default function useTranslatedName(): {
    translateName: (name: Translation) => string;
    otherOfficialNames: (name: Translation, officialLanguages?: LanguageCode[]) => string;
} {
    const { i18n } = useTranslation();

    const translateName = (name: Translation) => {
        return (
            i18n.languages.map(lang => name[lang as LanguageCode]).find(name => name !== undefined) ??
            name.en ??
            '(Translation Error)'
        );
    };

    return {
        translateName,
        otherOfficialNames: (name, officialLanguages) => {
            const displayName = translateName(name);
            return (
                officialLanguages
                    ?.filter(language => language !== i18n.language)
                    .map(language => name[language])
                    .filter(name => !!name && displayName !== name)
                    .reduce<string[]>((acc, cur) => (acc.includes(cur!) ? acc : [...acc, cur!]), [])
                    .join('/') ?? ''
            );
        },
    };
}
