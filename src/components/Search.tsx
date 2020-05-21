import React, { ChangeEvent, useRef } from 'react';
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/core';

type Search = {
  setSearch: (search: string[]) => void;
  search: string[];
};

export function Search({ search, setSearch }: Search) {
  const searchField = useRef<HTMLInputElement>(null);
  return (
    <InputGroup borderColor="gray.300">
      <InputLeftElement>
        <Icon color="gray.300" name="search-2" />
      </InputLeftElement>
      <Input
        aria-label="Cerca"
        placeholder="Cerca"
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
            aria-label="Cancella cerca"
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
