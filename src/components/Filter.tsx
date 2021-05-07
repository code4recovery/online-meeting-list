import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Button, FormControl, Select, Stack } from '@chakra-ui/core';

import { ButtonTag } from './ButtonTag';
import { Search } from './Search';
import { State, Tag } from '../helpers/types';
import { languages, getStrings } from '../helpers/i18n';

type FilterProps = {
  setSearch: (search: string[]) => void;
  setTimezone: (timezone: string) => void;
  setLanguage: (language: keyof typeof languages) => void;
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function Filter({
  setSearch,
  setTimezone,
  setLanguage,
  state,
  toggleTag
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const strings = getStrings(state.language);
  return (
    <Stack spacing={{ xs: 3, md: 6 }}>
      <FormControl>
        <Search search={state.search} setSearch={setSearch} state={state} />
      </FormControl>
      <Stack
        d={{ xs: open ? 'block' : 'none', md: 'block' }}
        spacing={{ xs: 3, md: 6 }}
      >
        {Object.keys(state.filters)
          .filter(filter => filter !== 'language')
          .map((filter: string, index: number) => (
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
            aria-label={strings.language}
            borderColor="gray.300"
            icon="chat"
            iconSize={4}
            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
              setLanguage(e.currentTarget.value as keyof typeof languages);
            }}
            value={state.language}
          >
            {Object.keys(languages).map((language, index) => (
              <option key={index} value={language}>
                {languages[language as keyof typeof languages].name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl d="block" as="fieldset">
          <Select
            aria-label={strings.timezone}
            borderColor="gray.300"
            icon="time"
            iconSize={4}
            onChange={(e: React.FormEvent<HTMLSelectElement>) =>
              setTimezone(e.currentTarget.value)
            }
            value={state.timezone}
          >
            {moment.tz.names().map((name, index) => (
              <option key={index}>{name}</option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <FormControl d={{ md: 'none' }}>
        <Button
          bg={open ? 'gray.100' : 'white'}
          borderColor="gray.300"
          onClick={() => {
            setOpen(!open);
          }}
          rightIcon={open ? 'chevron-up' : 'chevron-down'}
          variant="outline"
          w="100%"
        >
          {open ? strings.close : strings.filters}
        </Button>
      </FormControl>
    </Stack>
  );
}
