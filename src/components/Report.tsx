import { useContext, useState } from 'react';
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
  FormHelperText,
  FormErrorMessage,
  RadioGroup
} from '@chakra-ui/react';
import { ButtonReport } from './ButtonReport';
import { RadioButtons } from './RadioButtons';
import emailjs from '@emailjs/browser';
import { Meeting as MeetingType, i18n, validateEmail } from '../helpers';

export type ReportProps = {
  meeting: MeetingType;
};

export function Report({ meeting }: ReportProps) {
  const { rtl, strings } = useContext(i18n);
  const [formValues, setFormValues] = useState({
    email: meeting.email,
    id: meeting.id,
    meeting: meeting,
    name: meeting.name,
    problem: '',
    reporterComments: '',
    reporterEmail: '',
    reporterName: '',
    submitDisabled: true
  }); // End form values useState

  // Set form Values based on Meeting Report Submitted
  const changeData = (name: keyof typeof formValues, value: string) => {
    setFormValues(formValues => ({
      ...formValues,
      [name]: value,
      submitDisabled: !(
        formValues.reporterName && validateEmail(formValues.reporterEmail)
      )
    }));
  }; // End Change Data Method

  // Handle The Form Submission & Send The Email

  const serviceId = `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`;
  const templateId = `${process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID}`;
  const PublicKey = `${process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY}`;
  let templateParams = formValues;

  const sendEmail = () => {
    emailjs.send(serviceId, templateId, templateParams, PublicKey).then(
      () => {
        onClose();
      },
      function (error: any) {
        alert('Something Went Wrong - Please try again Later');
        console.log(error);
      }
    );
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen
  } = useDisclosure({ defaultIsOpen: true });

  const problems = [
    'No such meeting',
    'Broken link',
    'Incorrect passcode',
    'Removed from meeting',
    'Abusive behaviour'
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'problem',
    defaultValue: 'Choose One',
    onChange: value => changeData('problem', value)
  });

  const group = getRootProps();

  return isVisible ? (
    <Accordion allowToggle>
      <Box>
        <AccordionItem>
          <Box>
            <AccordionButton onClick={onOpen}>
              <Box textAlign={'right'} flex={'1'} fontSize={'xs'}>
                Report Problem
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel>
            <FormControl isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input
                type="text"
                name="reporterName"
                onChange={e => changeData('reporterName', e.target.value)}
              />
              <FormHelperText>
                Please Enter Your First Name &amp; Last Initial
              </FormHelperText>
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel>Your Email</FormLabel>
              <Input
                type="text"
                name="reporterEmail"
                onChange={e => changeData('reporterEmail', e.target.value)}
              />
              <FormHelperText>Please Enter Your Email</FormHelperText>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel mb={3}>What is the problem?</FormLabel>
              {!!problems.length && (
                <Stack {...group}>
                  {problems.map((value: any) => {
                    const radio = getRadioProps({ value });
                    return (
                      <Stack spacing={10} direction={rtl ? 'row' : 'column'}>
                        <RadioButtons {...radio} key={value}>
                          {value}
                        </RadioButtons>
                      </Stack>
                    );
                  })}
                </Stack>
              )}
              <FormHelperText>Please Choose One</FormHelperText>
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Additional Comments</FormLabel>
              <Textarea
                name="reporterComments"
                onChange={e => changeData('reporterComments', e.target.value)}
              ></Textarea>
            </FormControl>
            <FormControl>
              <ButtonReport
                disabled={formValues.submitDisabled}
                onClick={sendEmail}
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
