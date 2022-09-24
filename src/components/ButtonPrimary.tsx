import { Box, Button } from '@chakra-ui/react';

import { Icon } from './Icon';

export type ButtonPrimaryProps = {
  disabled?: boolean;
  icon?: 'link' | 'email' | 'phone' | 'small-close' | 'video';
  onClick: () => void;
  text: string;
  title?: string;
};

export function ButtonPrimary({
  disabled,
  icon,
  onClick,
  text,
  title
}: ButtonPrimaryProps) {
  return (
    <Button
      bg="blue.600"
      color="white"
      disabled={disabled}
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
    >
      <Box me={1}>{icon && <Icon name={icon} />}</Box>
      {text}
    </Button>
  );
}
