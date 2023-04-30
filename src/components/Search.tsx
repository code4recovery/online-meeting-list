import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';

import { Icon } from './Icon';
import { useAppState, useI18n } from '../helpers';

export function Search() {
  const { rtl, strings } = useI18n();
  const { state } = useAppState();

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
        defaultValue={state.searchWords.join(' ')}
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
