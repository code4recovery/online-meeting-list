import { FormEvent, useState } from 'react';
import { Button, Select, Stack, useColorModeValue } from '@chakra-ui/react';

import { Checkboxes } from './Checkboxes';
import { Search } from './Search';
import { Icon } from './Icon';
import { pushEvent, timezones, useData, useI18n, useInput } from '../helpers';

export function Filter() {
  const [open, setOpen] = useState(false);
  const { rtl, strings } = useI18n();
  const { input, setInput } = useInput();
  const { filters } = useData();

  const selectTheme = useColorModeValue(
    {
      bgColor: 'white',
      borderColor: 'gray.300',
      color: 'gray.500'
    },
    {
      bgColor: 'gray.900',
      borderColor: 'gray.700',
      color: 'gray.500'
    }
  );
  return (
    <Stack spacing={{ base: 4, md: 8 }}>
      <Search />
      <Stack
        display={{ base: open ? 'block' : 'none', md: 'block' }}
        spacing={{ base: 5, md: 8 }}
      >
        {Object.keys(filters)
          .filter(filter => filters[filter].length)
          .map(filter => (
            <Checkboxes key={filter} filter={filter} />
          ))}
        <Select
          {...selectTheme}
          aria-label={strings.timezone}
          icon={rtl ? <div /> : <Icon name="time" />}
          onChange={(e: FormEvent<HTMLSelectElement>) => {
            const timezone = e.currentTarget.value;
            setInput({ ...input, timezone });
            pushEvent({ event: 'timezone', value: timezone });
          }}
          value={input.timezone}
        >
          {timezones.map((name, index) => (
            <option key={index}>{name}</option>
          ))}
        </Select>
      </Stack>
      <Button
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.300', 'gray.800')}
        color="gray.500"
        display={{ base: 'flex', md: 'none' }}
        onClick={() => setOpen(!open)}
        rightIcon={<Icon name={open ? 'chevron-up' : 'chevron-down'} />}
        variant="outline"
        w="100%"
      >
        {open ? strings.close : strings.filters}
      </Button>
    </Stack>
  );
}
