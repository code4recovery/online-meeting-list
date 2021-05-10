import React, { ChangeEvent, useRef, useContext } from 'react';
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';

import { i18n, State } from '../helpers';
import { BsSearch } from 'react-icons/bs';

type Search = {
  setSearch: (search: string[]) => void;
  search: string[];
  state: State;
};

export function Search({ search, setSearch, state }: Search) {
  const searchField = useRef<HTMLInputElement>(null);
  const { rtl, t } = useContext(i18n);
  const clearButton = (
    <IconButton
      aria-label={t('clear_search')}
      bg="transparent"
      color="gray.300"
      icon={<BsSearch />}
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
  );
  return (
    <InputGroup borderColor="gray.300">
      {(!rtl || (rtl && !!search.length)) && (
        <InputLeftElement>
          {rtl && !!search.length && (
            <InputRightElement>{clearButton}</InputRightElement>
          )}
          {!rtl && <Icon color="gray.300" name="search-2" />}
        </InputLeftElement>
      )}
      <Input
        aria-label={t('search')}
        placeholder={t('search')}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(
            e.target.value
              .toLowerCase()
              .split(' ')
              .filter(e => e)
          );
        }}
        pl={rtl ? 4 : 10}
        pr={rtl ? 10 : 4}
        ref={searchField}
        textAlign={rtl ? 'right' : 'left'}
      />
      {(rtl || (!rtl && !!search.length)) && (
        <InputRightElement>
          {!rtl && !!search.length && (
            <InputRightElement>{clearButton}</InputRightElement>
          )}
          {rtl && <Icon color="gray.300" name="search-2" />}
        </InputRightElement>
      )}
    </InputGroup>
  );
}
