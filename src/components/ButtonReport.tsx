import { Button } from '@chakra-ui/react';

export type ButtonReportProps = {
  disabled: boolean;
  onClick: () => void;
  text: string;
  title: string;
};

export function ButtonReport({
  disabled,
  onClick,
  text,
  title
}: ButtonReportProps) {
  return (
    <Button
      _hover={{ bg: 'blue.800' }}
      bg="blue.600"
      color="white"
      disabled={disabled}
      mt={5}
      onClick={onClick}
      title={title}
    >
      {text}
    </Button>
  );
}
