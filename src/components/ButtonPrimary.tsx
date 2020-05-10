import React from 'react';
import { Button } from '@chakra-ui/core';

type ButtonPrimary = {
  icon: 'link' | 'email' | 'phone' | 'small-close';
  onClick: () => void;
  text: string;
  title?: string;
};

export function ButtonPrimary({ icon, text, title, onClick }: ButtonPrimary) {
  return (
    <Button
      bg="blue.600"
      color="white"
      leftIcon={icon}
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
    >
      {text}
    </Button>
  );
}
