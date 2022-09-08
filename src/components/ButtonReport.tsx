import { Button } from '@chakra-ui/react';

export type ButtonReportProps = {
  onClick: () => void;
  text: string;
  title: string;
  disabled: boolean;
};

export function ButtonReport({
  onClick,
  text,
  title,
  disabled
}: ButtonReportProps) {
  return (
    <Button
      bg="blue.600"
      color="white"
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
      disabled={disabled}
      mt={5}
    >
      {text}
    </Button>
  );
}