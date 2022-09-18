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
      bg="blue.600"
      color="white"
      disabled={disabled}
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
      mt={5}
    >
      {text}
    </Button>
  );
}
