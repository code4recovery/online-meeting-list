import {
  FormLabel,
  UseCheckboxProps,
  useCheckbox,
  useColorModeValue
} from '@chakra-ui/react';

export function Checkbox({
  isChecked,
  name,
  value,
  onChange
}: UseCheckboxProps) {
  const { getInputProps, getLabelProps } = useCheckbox({
    isChecked,
    name,
    onChange,
    value
  });
  const defaultTheme = useColorModeValue(
    {
      bg: 'gray.100',
      borderColor: 'gray.200',
      color: 'gray.600',
      _hover: { bg: 'gray.200', color: 'gray.600' }
    },
    {
      bg: 'gray.900',
      borderColor: 'gray.800',
      color: 'gray.400',
      _hover: { bg: 'gray.800', color: 'gray.400' }
    }
  );
  const checkedTheme = useColorModeValue(
    {
      bg: 'gray.900',
      borderColor: 'gray.200',
      color: 'gray.100',
      _hover: { bg: 'gray.800', color: 'gray.100' }
    },
    {
      bg: 'gray.100',
      borderColor: 'gray.800',
      color: 'gray.900',
      _hover: { bg: 'gray.200', color: 'gray.900' }
    }
  );
  return (
    <FormLabel
      {...getLabelProps()}
      {...(isChecked ? checkedTheme : defaultTheme)}
      borderRadius="base"
      borderWidth="1px"
      cursor="pointer"
      fontWeight="semibold"
      fontSize="sm"
      m={0}
      px={2}
      py={1}
    >
      <input {...getInputProps()} hidden />
      {value}
    </FormLabel>
  );
}
