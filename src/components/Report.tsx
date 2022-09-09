import {useState} from 'react';
import {Accordion, AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Box, FormControl,FormLabel,Input,Alert, AlertIcon, AlertTitle,  AlertDescription, useDisclosure, useRadioGroup, HStack} from '@chakra-ui/react';
import '../ReportMeeting.css';
import {ButtonReport} from './ButtonReport';
import {RadioButtons} from './RadioButtons'
import emailjs from '@emailjs/browser';
import { serviceID, templateID, publicKey } from '../helpers/config';

 export type ReportProps = {
    meetingName: string;
    meetingId?: string;
    meetingEmail?: string;

   }

   export function Report({meetingName,meetingId,meetingEmail} : ReportProps) {

    const [formValues, setFormValues] = useState(
        {
            meetingId : meetingId,
            meetingName : meetingName,
            meetingEmail : meetingEmail,
            reporterName : '',
            reporterEmail : '',
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
        console.log(formValues);
        if(formValues.reporterName && formValues.reporterEmail.length > 8) {
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
                    <Input type='text' name="reporterName" onChange={changeData} />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Your Email</FormLabel>
                    <Input type='text' name="reporterEmail" onChange={changeData} />
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
                <Input type="hidden" name="meetingEmail" value={meetingEmail}></Input>
                <Input type="hidden" value={meetingName} name="meetingName"></Input>
                <Input type="hidden" name="meetingId" value={meetingId}></Input>
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