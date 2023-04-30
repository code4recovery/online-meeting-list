import { Box, Button as ChakraButton } from '@chakra-ui/react';

import { Icon } from './Icon';

export function Button({
  disabled,
  icon,
  onClick,
  text,
  title
}: {
  disabled?: boolean;
  icon?: 'link' | 'email' | 'phone' | 'small-close' | 'video';
  onClick: () => void;
  text: string;
  title?: string;
}) {
  return (
    <ChakraButton
      bg="blue.600"
      color="white"
      disabled={disabled}
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
    >
      {icon && (
        <Box me={1}>
          <Icon name={icon} />
        </Box>
      )}
      {text}
    </ChakraButton>
  );
}
