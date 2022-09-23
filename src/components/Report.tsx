import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  useRadioGroup,
  Stack,
  Textarea,
  Text
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

import { Meeting as MeetingType, validateEmail } from '../helpers';
import { ButtonReport } from './ButtonReport';
import { RadioButtons } from './RadioButtons';

export type ReportProps = {
  meeting: MeetingType;
};

export function Report({ meeting }: ReportProps) {
  const [formValues, setFormValues] = useState({
    email: meeting.email,
    id: meeting.id,
    name: meeting.name,
    problem: '',
    reporterComments: '',
    reporterEmail: '',
    reporterName: '',
    submitDisabled: true
  });

  // Set form Values based on Meeting Report Submitted
  const changeData = (name: keyof typeof formValues, value: string) => {
    setFormValues(formValues => ({
      ...formValues,
      [name]: value,
      submitDisabled: !(
        formValues.reporterName && validateEmail(formValues.reporterEmail)
      )
    }));
  };

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  const problems = [
    'No such meeting',
    'Broken link',
    'Incorrect passcode',
    'Removed from meeting',
    'Abusive behaviour'
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: 'Choose One',
    name: 'problem',
    onChange: value => changeData('problem', value)
  });

  const sendEmail = () => {
    emailjs
      .send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID ?? '',
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID ?? '',
        formValues,
        process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
      )
      .then(() => onClose())
      .catch(error => {
        alert('Something went wrong. Please try again later.');
        console.log(error);
      });
  };

  return isOpen ? (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton onClick={onOpen}>
          <Box textAlign="end" flex="1" border="sm">
            <Text fontSize="sm" color="gray.500">
              Report Problem
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Stack gap={5}>
            <FormControl isRequired>
              <FormLabel>Your name</FormLabel>
              <Input
                name="reporterName"
                onChange={e => changeData('reporterName', e.target.value)}
                placeholder="Jennifer E."
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Your email</FormLabel>
              <Input
                name="reporterEmail"
                onChange={e => changeData('reporterEmail', e.target.value)}
                placeholder="your.email@service.com"
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel mb={3}>What is the problem?</FormLabel>
              {!!problems.length && (
                <Stack {...getRootProps()}>
                  {problems.map((value: any) => (
                    <Stack spacing={10}>
                      <RadioButtons {...getRadioProps({ value })} key={value}>
                        {value}
                      </RadioButtons>
                    </Stack>
                  ))}
                </Stack>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Comments</FormLabel>
              <Textarea
                name="reporterComments"
                onChange={e => changeData('reporterComments', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <ButtonReport
                disabled={formValues.submitDisabled}
                onClick={sendEmail}
                text="Send Report"
                title="report"
              />
            </FormControl>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <Alert
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      p="30px"
      status="success"
      textAlign="center"
      variant="subtle"
    >
      <AlertIcon boxSize="40px" m={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Report Sent
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for letting us know. We will get in touch with the group!
      </AlertDescription>
    </Alert>
  );
}
