import { Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { RmgEnvBadge, RmgWindowHeader } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import { handleLanguageChange } from '../i18n/config';
import { LanguageCode } from '@railmapgen/rmg-translate';
import { MdTranslate } from 'react-icons/md';
import rmgRuntime from '@railmapgen/rmg-runtime';

export default function WindowHeader() {
    const { t } = useTranslation();

    const environment = rmgRuntime.getEnv();
    const appVersion = rmgRuntime.getAppVersion();

    const handleSelectLanguage = (language: LanguageCode) => {
        rmgRuntime.setLanguage(language);
        handleLanguageChange(language);
    };

    return (
        <RmgWindowHeader>
            <Heading as="h4" size="md">
                {t('Palette')}
            </Heading>
            <RmgEnvBadge environment={environment} version={appVersion} />

            <HStack ml="auto">
                <Menu>
                    <MenuButton as={IconButton} icon={<MdTranslate />} variant="ghost" size="sm" />
                    <MenuList>
                        <MenuItem onClick={() => handleSelectLanguage(LanguageCode.English)}>English</MenuItem>
                        <MenuItem onClick={() => handleSelectLanguage(LanguageCode.ChineseSimp)}>简体中文</MenuItem>
                        <MenuItem onClick={() => handleSelectLanguage(LanguageCode.ChineseTrad)}>繁體中文</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </RmgWindowHeader>
    );
}
