import React from 'react';
import { Button } from '@chakra-ui/core';

import { Tag } from '../helpers';

type ButtonTag = {
  filter: string;
  tag: Tag;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function ButtonTag({ filter, tag, toggleTag }: ButtonTag) {
  return (
    <Button
      bg={tag.checked ? 'gray.900' : 'gray.100'}
      border="1px"
      borderColor="gray.200"
      color={tag.checked ? 'gray.100' : 'gray.600'}
      mr={2}
      my={1}
      onClick={e => {
        toggleTag(filter, tag.tag, !tag.checked);
      }}
      size="sm"
      _hover={{
        bg: tag.checked ? 'gray.800' : 'gray.200',
        color: tag.checked ? 'gray.100' : 'gray.600'
      }}
    >
      {tag.tag}
    </Button>
  );
}
