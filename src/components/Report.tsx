import {useState} from 'react';
import {Accordion, AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Box, FormControl,FormLabel,FormErrorMessage,FormHelperText, Input, useRadio, RadioGroup, Radio,Alert, AlertIcon, AlertTitle,  AlertDescription, useDisclosure, CloseButton, Button, Stack, Heading, useRadioGroup, HStack, Tag} from '@chakra-ui/react';
import '../ReportMeeting.css';
import {ButtonReport} from './ButtonReport';
import {MeetingProblem as ReportType}  from '../helpers';
import {RadioButtons} from './RadioButtons'
import emailjs from '@emailjs/browser';
import { serviceID, templateID, publicKey } from '../helpers/config';
import { report } from 'process';

 export type ReportProps = {
    meeting_name: string;
    meeting_id?: string;
    meeting_email?: string;

   }

   export function Report({meeting_name,meeting_id,meeting_email} : ReportProps) {

    const [formValues, setFormValues] = useState(
        {
            meeting_id : meeting_id,
            meeting_name : meeting_name,
            meeting_email : meeting_email,
            reporter_name : '',
            reporter_email : '',
            problem : '',
            submitDisabled : true
        }
    ) // End form values useState

    // Set form Values based on Meeting Report Submitted
    const changeData = (e : any) =>{
        setFormValues(formValues => ({
            ...formValues,
            [e.target.name] : e.target.value
        }))
        if(formValues.reporter_name && formValues.reporter_email.length > 8) {
            setFormValues(formValues =>({
                ...formValues,
                submitDisabled : false
            }))
        }
    } // End Change Data Method

    // Handle The Form Submission & Send The Email

            const serviceId = `${serviceID}`;
            const templateId = `${templateID}`;
            const PublicKey = `${publicKey}`;
            let templateParams = formValues;

            const sendEmail = () => {            
            emailjs.send(serviceId, templateId, templateParams, PublicKey)           
            
            }  

            const handleSubmit = () => {
            try 
            {
            sendEmail()
            onClose()
            } catch(e: any) {
            <Alert status="error">
                <AlertTitle>{e.target.value}</AlertTitle>
            </Alert>
            } 

            }

    const {isOpen: isVisible, onClose,onOpen} = useDisclosure({defaultIsOpen: true})

    const problems = ['Broken Link', 'Wrong Passcode', 'Discrimination', 'Abusive Behaviour', 'Removed From Meeting'];
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: 'meeting_problem',
        defaultValue: 'Choose One',
        onChange: console.log
    })

    const group = getRootProps();

    return isVisible ?(
    <Accordion allowToggle>
        <Box>
             <AccordionItem>
             <Box className="report-problem">
            <AccordionButton onClick={onOpen}>
                <Box className="report-problem" textAlign={'left'} flex={'1'}>
                    Report Problem
                </Box>
                <AccordionIcon />
            </AccordionButton>

            </Box>
            <AccordionPanel>
                <FormControl mt={5}>
                    <FormLabel>Your Name</FormLabel>
                    <Input type='text' name="reporter_name" onChange={changeData} />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Your Email</FormLabel>
                    <Input type='text' name="reporter_email" onChange={changeData} />
                </FormControl>
                <FormControl mt={5}>
                {!!problems.length && (
                    <HStack {...group}>
                        {problems.map((value: any) =>{
                            const radio = getRadioProps({value})
                            return(
                                <RadioButtons key={value} {...radio} name={"problem"} onChange={changeData}>
                                    {value}
                                </RadioButtons>
                            )
                        })}
                    </HStack>
                )}
                </FormControl>
                <FormControl>
                    <ButtonReport 
                    text={'Send Report'}
                    disabled={formValues.submitDisabled}
                    title={'report'}
                    onClick={handleSubmit}/>                                
                </FormControl>
                <Input type="hidden" name="meeting_email" value={meeting_email}></Input>
                <Input type="hidden" value={meeting_name} name="meeting_name"></Input>
                <Input type="hidden" name="meeting_id" value={meeting_id}></Input>
            </AccordionPanel>  
             </AccordionItem>
        </Box>
    </Accordion>
    ) : (
        <Alert
         status='success'
         variant='subtle'
         flexDirection='column'
         alignItems='center'
         justifyContent='center'
         textAlign='center'
         height='200px'
       >
         <AlertIcon boxSize='40px' mr={0} />
         <AlertTitle mt={4} mb={1} fontSize='lg'>
           Meeting Reported
         </AlertTitle>
         <AlertDescription maxWidth='sm'>
           Thanks for letting us know.  We will get in touch with the group!
         </AlertDescription>
       </Alert>
    )

   } //End Report Function