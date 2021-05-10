import React, { useContext, useState } from 'react';
import moment from 'moment-timezone';
import { Button, FormControl, Select, Stack } from '@chakra-ui/react';
import { BsChat, BsChevronUp, BsClock, BsChevronDown } from 'react-icons/bs';

import { ButtonTag } from './ButtonTag';
import { Search } from './Search';
import { languages, Language, State, Tag, i18n } from '../helpers';

type FilterProps = {
  setSearch: (search: string[]) => void;
  setTimezone: (timezone: string) => void;
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function Filter({
  setSearch,
  setTimezone,
  state,
  toggleTag
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const { language, t } = useContext(i18n);
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
          .map(
            (filter: string, index: number) =>
              !!state.filters[filter].length && (
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
              )
          )}
        <FormControl d="block" as="fieldset">
          <Select
            aria-label={t('language')}
            borderColor="gray.300"
            icon={<BsChat />}
            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
              //hard reload so types get refreshed
              window.location.href = `${window.location.pathname}?lang=${e.currentTarget.value}`;
            }}
            value={language}
          >
            {Object.keys(languages).map((language, index) => (
              <option key={index} value={language}>
                {languages[language as Language].name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl d="block" as="fieldset">
          <Select
            aria-label={t('timezone')}
            borderColor="gray.300"
            icon={<BsClock />}
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
          rightIcon={open ? <BsChevronUp /> : <BsChevronDown />}
          variant="outline"
          w="100%"
        >
          {open ? t('close', language) : t('filters', language)}
        </Button>
      </FormControl>
    </Stack>
  );
}
