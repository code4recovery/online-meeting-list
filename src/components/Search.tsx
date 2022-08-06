import { useRef, useContext } from 'react';
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
  setSearch: (search: string) => void;
  search: string;
  state: State;
};

export function Search({ search, setSearch }: SearchProps) {
  const searchField = useRef<HTMLInputElement>(null);
  const { rtl, strings } = useContext(i18n);
  const clearButton = (
    <IconButton
      aria-label={strings.clear_search}
      bg="transparent"
      icon={<Icon name="small-close" />}
      _active={{ bg: 'transparent', color: 'gray.500' }}
      _hover={{ bg: 'transparent', color: 'gray.500' }}
      onClick={() => {
        setSearch('');
        if (searchField.current) {
          searchField.current.focus();
        }
      }}
    />
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
        aria-label={strings.search}
        bgColor="white"
        placeholder={strings.search}
        onChange={e => setSearch(e.target.value)}
        value={search}
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
