import { FormEvent, useState } from 'react';
import moment from 'moment-timezone';
import { Button, Select, Stack, useColorModeValue } from '@chakra-ui/react';

import { Checkboxes } from './Checkboxes';
import { Search } from './Search';
import { Icon } from './Icon';
import { useData, useI18n, useInput } from '../helpers';

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
    <Stack spacing={{ base: 3, md: 8 }}>
      <Search />
      <Stack
        display={{ base: open ? 'block' : 'none', md: 'block' }}
        spacing={{ base: 3, md: 8 }}
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
          onChange={(e: FormEvent<HTMLSelectElement>) =>
            setInput({ ...input, timezone: e.currentTarget.value })
          }
          value={input.timezone}
        >
          {moment.tz.names().map((name, index) => (
            <option key={index}>{name}</option>
          ))}
        </Select>
      </Stack>
      <Button
        bg={open ? 'transparent' : 'white'}
        borderColor="gray.300"
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
