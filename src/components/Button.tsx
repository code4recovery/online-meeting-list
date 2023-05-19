import { Button as ChakraButton, useColorModeValue } from '@chakra-ui/react';

import { Icon } from './Icon';
import React from 'react';
import { useI18n } from '../helpers';

export function Button({
  children,
  icon,
  primary,
  ...rest
}: {
  icon?: React.ComponentProps<typeof Icon>['name'];
  primary?: boolean;
} & React.ComponentProps<typeof ChakraButton>) {
  const { rtl } = useI18n();

  const color = useColorModeValue('gray.800 !important', 'white !important');

  return (
    <ChakraButton
      {...rest}
      {...(primary
        ? {
            _hover: { bg: 'blue.800' },
            bg: 'blue.600',
            color: 'white !important'
          }
        : {
            color,
            _active: { bg: color },
            _focus: { bg: color }
          })}
      textTransform="none"
      leftIcon={icon && !rtl ? <Icon name={icon} /> : undefined}
      rightIcon={icon && rtl ? <Icon name={icon} /> : undefined}
    >
      {children}
    </ChakraButton>
  );
}
