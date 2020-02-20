import React from "react";

import {
  ThemeProvider,
  CSSReset,
  Stack,
  Box,
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  Divider
} from "@chakra-ui/core";

import * as meetings from "./meetings.json";

function App() {
  const formats = {
    email: "Email",
    chat: "Chat",
    video: "Video",
    phone: "Phone",
    forum: "Forum"
  };
  const formatsKeys = Object.keys(formats);

  console.log(meetings);

  return (
    <ThemeProvider>
      <CSSReset />
      <Grid templateColumns="70% 30%" gap={6} p={6}>
        <Box w="100%" h="10">
          <Stack spacing={8}>
            {meetings.map(meeting => (
              <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
                <Heading fontSize="xl">Meeting name</Heading>
                <Text mt={4}>Lorem ipsum</Text>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box w="100%" h="10">
          <FormControl as="fieldset">
            <FormLabel as="legend" fontSize="lg" fontWeight="bold">
              Format
            </FormLabel>
            <Divider />
            <CheckboxGroup variantColor="green" defaultValue={formatsKeys}>
              {formatsKeys.map(format => (
                <Checkbox value={format}>
                  {formats[format as keyof typeof formats]}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </FormControl>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
