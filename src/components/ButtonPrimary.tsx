import React from 'react';
import { Button, Icon } from '@chakra-ui/core';

type ButtonPrimary = {
  icon: 'link' | 'email' | 'phone' | 'small-close' | 'video';
  onClick: () => void;
  text: string;
  title?: string;
};

export function ButtonPrimary({ icon, text, title, onClick }: ButtonPrimary) {
  return (
    <Button
      bg="blue.600"
      color="white"
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
    >
      <Icon name={icon} mr={2} />
      {text}
    </Button>
  );
}
