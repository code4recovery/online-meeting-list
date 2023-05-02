import { useRef } from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';

import { Icon } from './Icon';
import { parseSearchWords, useInput, useI18n } from '../helpers';

export function Search() {
  const { rtl, strings } = useI18n();
  const { input, setInput } = useInput();
  const searchField = useRef<HTMLInputElement>(null);

  const clearButton = (
    <IconButton
      aria-label={strings.clear_search}
      bg="transparent"
      icon={<Icon name="small-close" />}
      _active={{ bg: 'transparent', color: 'gray.500' }}
      _hover={{ bg: 'transparent', color: 'gray.500' }}
      onClick={() => {
        setInput({
          ...input,
          searchWords: []
        });
        if (searchField.current) {
          searchField.current.value = '';
          searchField.current.focus();
        }
      }}
    />
  );

  return (
    <InputGroup borderColor="gray.300" color="gray.500">
      {(!rtl || !!input.searchWords.length) && (
        <InputLeftElement>
          {rtl ? clearButton : <Icon name="search" />}
        </InputLeftElement>
      )}
      <Input
        aria-label={strings.search}
        bgColor="white"
        defaultValue={input.searchWords.join(' ')}
        onChange={e =>
          setInput({
            ...input,
            searchWords: parseSearchWords(e.currentTarget.value)
          })
        }
        name="search"
        pl={rtl ? 4 : 9}
        placeholder={strings.search}
        pr={rtl ? 9 : 4}
        ref={searchField}
        textAlign={rtl ? 'right' : 'left'}
      />
      {(rtl || !!input.searchWords.length) && (
        <InputRightElement>
          {rtl ? <Icon name="search" /> : clearButton}
        </InputRightElement>
      )}
    </InputGroup>
  );
}
