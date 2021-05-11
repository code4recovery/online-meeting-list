import React, { ChangeEvent, useRef, useContext } from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';

import { Icon } from './Icon';
import { i18n, State } from '../helpers';

export type SearchProps = {
  setSearch: (search: string[]) => void;
  search: string[];
  state: State;
};

export function Search({ search, setSearch }: SearchProps) {
  const searchField = useRef<HTMLInputElement>(null);
  const { rtl, t } = useContext(i18n);
  const clearButton = (
    <IconButton
      aria-label={t('clear_search')}
      bg="transparent"
      icon={<Icon name="small-close" />}
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
    <InputGroup borderColor="gray.300" color="gray.500">
      {(!rtl || (rtl && !!search.length)) && (
        <InputLeftElement>
          {rtl && !!search.length && clearButton}
          {!rtl && <Icon name="search" />}
        </InputLeftElement>
      )}
      <Input
        aria-label={t('search')}
        bgColor="white"
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
          {!rtl && !!search.length && clearButton}
          {rtl && <Icon name="search" />}
        </InputRightElement>
      )}
    </InputGroup>
  );
}
