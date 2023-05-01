import {
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

  return (
    <InputGroup borderColor="gray.300" color="gray.500">
      {!rtl && (
        <InputLeftElement>
          <Icon name="search" />
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
        textAlign={rtl ? 'right' : 'left'}
      />
      {rtl && (
        <InputRightElement>
          <Icon name="search" />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
