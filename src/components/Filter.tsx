import { FormEvent, useContext, useState } from 'react';
import moment from 'moment-timezone';
import { Button, FormControl, Select, Stack } from '@chakra-ui/react';

import { ButtonTag } from './ButtonTag';
import { Search } from './Search';
import { Icon } from './Icon';
import { languages, Language, State, Tag, i18n } from '../helpers';

export type FilterProps = {
  setSearch: (search: string) => void;
  setTimezone: (timezone: string) => void;
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
  currentDays: string[];
};

export function Filter({
  setSearch,
  setTimezone,
  state,
  toggleTag,
  currentDays
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const { language, rtl, strings } = useContext(i18n);

  //filter out unused days
  state.filters.days = state.filters.days.filter(day =>
    currentDays.includes(day.tag)
  );

  return (
    <Stack spacing={{ base: 3, md: 6 }}>
      <FormControl>
        <Search search={state.search} setSearch={setSearch} state={state} />
      </FormControl>
      <Stack
        display={{ base: open ? 'block' : 'none', md: 'block' }}
        spacing={{ base: 3, md: 6 }}
      >
        {Object.keys(state.filters).map(
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
        {state.languages.length > 1 && (
          <FormControl display="block" as="fieldset">
            <Select
              aria-label={strings.language}
              bgColor="white"
              borderColor="gray.300"
              color="gray.500"
              iconColor="gray.500"
              icon={rtl ? <div /> : <Icon name="language" />}
              onChange={(e: FormEvent<HTMLSelectElement>) => {
                //hard reload so types get refreshed
                window.location.href = `${window.location.pathname}?lang=${e.currentTarget.value}`;
              }}
              value={language}
            >
              {state.languages.map((language, index) => (
                <option key={index} value={language}>
                  {languages[language as Language].name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl display="block" as="fieldset">
          <Select
            aria-label={strings.timezone}
            bgColor="white"
            borderColor="gray.300"
            color="gray.500"
            icon={rtl ? <div /> : <Icon name="time" />}
            onChange={(e: FormEvent<HTMLSelectElement>) =>
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
      <FormControl display={{ md: 'none' }}>
        <Button
          bg={open ? 'transparent' : 'white'}
          borderColor="gray.300"
          color="gray.500"
          onClick={() => setOpen(!open)}
          rightIcon={<Icon name={open ? 'chevron-up' : 'chevron-down'} />}
          variant="outline"
          w="100%"
        >
          {open ? strings.close : strings.filters}
        </Button>
      </FormControl>
    </Stack>
  );
}
