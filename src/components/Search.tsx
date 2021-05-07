import React, { ChangeEvent, useRef } from 'react';
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/core';

import { getStrings } from '../helpers/i18n';
import { State } from '../helpers/types';

type Search = {
  setSearch: (search: string[]) => void;
  search: string[];
  state: State;
};

export function Search({ search, setSearch, state }: Search) {
  const searchField = useRef<HTMLInputElement>(null);
  const strings = getStrings(state.language);
  return (
    <InputGroup borderColor="gray.300">
      <InputLeftElement>
        <Icon color="gray.300" name="search-2" />
      </InputLeftElement>
      <Input
        aria-label={strings.search}
        placeholder={strings.search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(
            e.target.value
              .toLowerCase()
              .split(' ')
              .filter(e => e)
          );
        }}
        ref={searchField}
      />
      {!!search.length && (
        <InputRightElement>
          <IconButton
            aria-label={strings.clear_search}
            bg="transparent"
            color="gray.300"
            icon="small-close"
            _active={{ bg: 'transparent', color: 'gray.500' }}
            _hover={{ bg: 'transparent', color: 'gray.500' }}
            onClick={() => {
              setSearch([]);
              if (searchField.current) {
                searchField.current.value = '';
                searchField.current.focus();
              }
            }}
          ></IconButton>
        </InputRightElement>
      )}
    </InputGroup>
  );
}
