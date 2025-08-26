import { Button as ChakraButton } from '@chakra-ui/react';

import React from 'react';
import { useI18n } from '../helpers';
import { Icon } from './Icon';

export function Button({
  children,
  icon,
  primary,
  ...rest
}: {
  icon?: React.ComponentProps<typeof Icon>['name'];
  primary?: boolean;
} & { href?: string } & React.ComponentProps<typeof ChakraButton>) {
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
      as={rest.href ? 'a' : 'button'}
      borderRadius="md"
      textTransform="none"
      leftIcon={icon && !rtl ? <Icon name={icon} /> : undefined}
      rightIcon={icon && rtl ? <Icon name={icon} /> : undefined}
    >
      {children}
    </ChakraButton>
  );
}
