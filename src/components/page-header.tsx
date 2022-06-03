import { countryList } from '@railmapgen/rmg-palette-resources';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/app-slice';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { useRootSelector } from '../redux';
import { Button, Flex, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedCountry = useRootSelector(state => state.app.selectedCountry);

    const countryOptions = countryList.reduce<Record<string, string>>(
        (acc, cur) => {
            return { ...acc, [cur.id]: cur.name.en! };
        },
        { '': 'Please select...' }
    );

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: 'Country/Region',
            value: selectedCountry,
            options: countryOptions,
            disabledOptions: [''],
            onChange: value => dispatch(setSelectedCountry(value as string)),
        },
    ];

    return (
        <Flex align="center" wrap="wrap" pl={2} pr={3} py={1}>
            <RmgFields fields={fields} />

            <HStack ml="auto">
                <Button variant="solid" size="sm" colorScheme="teal" onClick={() => navigate('/new')}>
                    Add a city
                </Button>
            </HStack>
        </Flex>
    );
}
