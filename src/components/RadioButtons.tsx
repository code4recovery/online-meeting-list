import { Box, Input, useRadio, useRadioGroup } from '@chakra-ui/react';

export function RadioButtons(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <Input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
