import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Button, FormControl, Select, Stack } from '@chakra-ui/core';

import { ButtonTag, Search } from './';
import { State, Tag } from '../helpers';

type Filter = {
  setSearch: (search: string[]) => void;
  setTimezone: (timezone: string) => void;
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function Filter({ setSearch, setTimezone, state, toggleTag }: Filter) {
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing={{ xs: 3, md: 6 }}>
      <FormControl>
        <Search search={state.search} setSearch={setSearch} />
      </FormControl>
      <Stack
        d={{ xs: open ? 'block' : 'none', md: 'block' }}
        spacing={{ xs: 3, md: 6 }}
      >
        {Object.keys(state.filters).map((filter: string, index: number) => (
          <FormControl key={index}>
            {state.filters[filter].map((tag: Tag, index: number) => (
              <ButtonTag
                filter={filter}
                key={index}
                tag={tag}
                toggleTag={toggleTag}
              />
            ))}
          </FormControl>
        ))}
        <FormControl d="block" as="fieldset">
          <Select
            aria-label="Timezone"
            icon="time"
            iconSize={4}
            onChange={(e: React.FormEvent<HTMLSelectElement>) =>
              setTimezone(e.currentTarget.value)
            }
            value={state.timezone}
          >
            {moment.tz.names().map((name: string, index: number) => (
              <option key={index}>{name}</option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <FormControl d={{ md: 'none' }}>
        <Button
          bg="white"
          onClick={() => {
            setOpen(!open);
          }}
          rightIcon={open ? 'chevron-up' : 'chevron-down'}
          variant="outline"
          w="100%"
        >
          {open ? 'Close' : 'Filters'}
        </Button>
      </FormControl>
    </Stack>
  );
}
