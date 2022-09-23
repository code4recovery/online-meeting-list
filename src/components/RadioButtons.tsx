import { Box, Input, useRadio } from '@chakra-ui/react';

export function RadioButtons(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  return (
    <Box as="label">
      <Input {...getInputProps()} />
      <Box
        {...getCheckboxProps()}
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        borderRadius="md"
        borderWidth="1px"
        boxShadow="md"
        cursor="pointer"
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
