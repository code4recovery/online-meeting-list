import React from "react";

import {
  ThemeProvider,
  CSSReset,
  Stack,
  Box,
  Grid,
  Heading,
  Text
} from "@chakra-ui/core";

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Grid templateColumns="70% 30%" gap={6} p={6}>
        <Box w="100%" h="10">
          <Stack spacing={8}>
            <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
              <Heading fontSize="xl">Meeting name</Heading>
              <Text mt={4}>Lorem ipsum</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
              <Heading fontSize="xl">Meeting name</Heading>
              <Text mt={4}>Lorem ipsum</Text>
            </Box>
          </Stack>
        </Box>
        <Box w="100%" h="10">
          This is a test.
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
