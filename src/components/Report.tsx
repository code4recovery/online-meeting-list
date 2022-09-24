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
  Stack,
  Textarea,
  Text
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

import { Meeting as MeetingType, validateEmail } from '../helpers';
import { ButtonPrimary } from './ButtonPrimary';

export type ReportProps = {
  meeting: MeetingType;
};

export function Report({ meeting }: ReportProps) {
  const [formValues, setFormValues] = useState({
    email: meeting.email,
    id: meeting.id,
    name: meeting.name,
    reporterComments: '',
    reporterEmail: '',
    reporterName: ''
  });

  //false = sending, true = sent, string = error
  const [formStatus, setFormStatus] = useState<boolean | string | undefined>();

  // Set form Values based on Meeting Report Submitted
  const changeData = (name: keyof typeof formValues, value: string) => {
    setFormValues(formValues => ({
      ...formValues,
      [name]: value
    }));
  };

  const sendEmail = () => {
    setFormStatus(false);
    emailjs
      .send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID ?? '',
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID ?? '',
        formValues,
        process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
      )
      .then(() => setFormStatus(true))
      .catch(error => setFormStatus(error.text));
  };

  return typeof formStatus === 'undefined' ? (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box textAlign="end" flex="1" border="sm">
            <Text fontSize="sm" color="gray.500">
              Report Problem
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Stack gap={5}>
            <Stack direction={{ base: 'column', lg: 'row' }} gap={5}>
              <FormControl isRequired>
                <FormLabel>Your name</FormLabel>
                <Input
                  name="reporterName"
                  onChange={e => changeData('reporterName', e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Your email</FormLabel>
                <Input
                  name="reporterEmail"
                  onChange={e => changeData('reporterEmail', e.target.value)}
                  type="email"
                />
              </FormControl>
            </Stack>
            <FormControl isRequired>
              <FormLabel>Comments</FormLabel>
              <Textarea
                name="reporterComments"
                onChange={e => changeData('reporterComments', e.target.value)}
                resize="none"
                rows={7}
              />
            </FormControl>
            <FormControl>
              <ButtonPrimary
                disabled={
                  !formValues.reporterName ||
                  !formValues.reporterComments ||
                  !validateEmail(formValues.reporterEmail)
                }
                onClick={sendEmail}
                text="Send Report"
              />
            </FormControl>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <Alert
      flexDirection="column"
      p={8}
      status={
        formStatus === false
          ? 'loading'
          : formStatus === true
          ? 'success'
          : 'error'
      }
    >
      <AlertIcon boxSize={10} m={0} />
      <AlertTitle fontSize="lg" mb={2} mt={4} mx={0}>
        {formStatus === false
          ? 'Sending'
          : formStatus === true
          ? 'Report Sent'
          : 'Error'}
      </AlertTitle>
      {formStatus && (
        <AlertDescription maxWidth="sm" textAlign="center">
          {formStatus === true
            ? 'Thanks for letting us know. We will follow up with the group!'
            : formStatus}
        </AlertDescription>
      )}
    </Alert>
  );
}
