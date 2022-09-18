import { Box, Input, useRadio } from '@chakra-ui/react';

export function RadioButtons(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <Input {...input} />
      <Box
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        {...checkbox}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        cursor="pointer"
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}
