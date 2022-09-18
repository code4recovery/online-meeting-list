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
  HStack,
  Stack
} from '@chakra-ui/react';
import { ButtonReport } from './ButtonReport';
import { RadioButtons } from './RadioButtons';
import emailjs from '@emailjs/browser';
import { Meeting as MeetingType } from '../helpers';

export type ReportProps = {
  meeting: MeetingType;
};

export function Report({ meeting }: ReportProps) {
  const [formValues, setFormValues] = useState({
    meeting: meeting,
    id: meeting.id,
    name: meeting.name,
    email: meeting.email,
    problem: '',
    reporterName: '',
    reporterEmail: '',
    submitDisabled: true
  }); // End form values useState

  // Set form Values based on Meeting Report Submitted
  const changeData = (e: any) => {
    setFormValues(formValues => ({
      ...formValues,
      [e.target.name]: e.target.value
    }));
    if (formValues.reporterName && formValues.reporterEmail.length > 8) {
      setFormValues(formValues => ({
        ...formValues,
        submitDisabled: false
      }));
    }
  }; // End Change Data Method

  // Handle The Form Submission & Send The Email

  const serviceId = `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`;
  const templateId = `${process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID}`;
  const PublicKey = `${process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY}`;
  let templateParams = formValues;

  const sendEmail = () => {
    emailjs.send(serviceId, templateId, templateParams, PublicKey);
  };

  const handleSubmit = () => {
    try {
      sendEmail();
      onClose();
    } catch (e: any) {
      <Alert status="error">
        <AlertTitle>{e.target.value}</AlertTitle>
      </Alert>;
    }
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen
  } = useDisclosure({ defaultIsOpen: true });

  const problems = [
    'Abusive Behaviour',
    'Broken Link',
    'Discrimination',
    'Removed From Meeting',
    'Wrong Passcode'
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'meeting_problem',
    defaultValue: 'Choose One',
    onChange: console.log
  });

  const group = getRootProps();

  return isVisible ? (
    <Accordion allowToggle>
      <Box>
        <AccordionItem>
          <Box className="report-problem">
            <AccordionButton onClick={onOpen}>
              <Box textAlign={'right'} flex={'1'} fontSize={'xs'}>
                Report Problem
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel>
            <FormControl mt={5}>
              <FormLabel>Your Name</FormLabel>
              <Input type="text" name="reporterName" onChange={changeData} />
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Your Email</FormLabel>
              <Input type="text" name="reporterEmail" onChange={changeData} />
            </FormControl>
            <FormControl mt={5}>
              {!!problems.length && (
                <HStack {...group}>
                  {problems.map((value: any) => {
                    const radio = getRadioProps({ value });
                    return (
                      <Stack spacing={3}>
                        <RadioButtons
                          key={value}
                          {...radio}
                          name={'problem'}
                          onChange={changeData}
                        >
                          {value}
                        </RadioButtons>
                      </Stack>
                    );
                  })}
                </HStack>
              )}
            </FormControl>
            <FormControl>
              <ButtonReport
                disabled={formValues.submitDisabled}
                onClick={handleSubmit}
                text={'Send Report'}
                title={'report'}
              />
            </FormControl>
            <Input type="hidden" name="email" value={meeting.email}></Input>
            <Input type="hidden" name="name" value={meeting.name}></Input>
            <Input type="hidden" name="id" value={meeting.id}></Input>
          </AccordionPanel>
        </AccordionItem>
      </Box>
    </Accordion>
  ) : (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Meeting Reported
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for letting us know. We will get in touch with the group!
      </AlertDescription>
    </Alert>
  );
} //End Report Function
