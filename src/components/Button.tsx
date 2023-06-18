import { Button as ChakraButton } from '@chakra-ui/react';

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

  return (
    <ChakraButton
      {...rest}
      {...(primary
        ? {
            _active: { bg: 'blue.700', color: 'white' },
            _hover: { bg: 'blue.700', color: 'white' },
            bg: 'blue.600',
            color: 'white'
          }
        : {})}
      borderRadius="md"
      textTransform="none"
      leftIcon={icon && !rtl ? <Icon name={icon} /> : undefined}
      rightIcon={icon && rtl ? <Icon name={icon} /> : undefined}
    >
      {children}
    </ChakraButton>
  );
}
