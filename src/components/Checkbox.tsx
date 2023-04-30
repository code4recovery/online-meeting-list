import { FormLabel, UseCheckboxProps, useCheckbox } from '@chakra-ui/react';

export function Checkbox({ isChecked, name, value }: UseCheckboxProps) {
  const { getInputProps, getLabelProps } = useCheckbox({
    isChecked,
    name,
    value
  });
  return (
    <FormLabel
      {...getLabelProps()}
      bg={isChecked ? 'gray.900' : 'gray.100'}
      border="1px"
      borderRadius="base"
      borderColor="gray.200"
      color={isChecked ? 'gray.100' : 'gray.600'}
      cursor="pointer"
      fontWeight="semibold"
      fontSize="sm"
      m={0}
      px={2}
      py={1}
      _hover={{
        bg: isChecked ? 'gray.800' : 'gray.200',
        color: isChecked ? 'gray.100' : 'gray.600'
      }}
    >
      <input {...getInputProps()} hidden />
      {value}
    </FormLabel>
  );
}
