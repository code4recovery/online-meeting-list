import React from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select
} from "@chakra-ui/core";

import * as moment from "moment-timezone";

type Filter = {
  timezone: string;
  formats: string[];
  types: string[];
};

export function Filter(props: Filter) {
  return (
    <Box w="100%">
      <FormControl as="fieldset" mb={6}>
        <FormLabel as="legend" fontSize="lg" fontWeight="bold">
          Your Timezone
        </FormLabel>
        <Select value={props.timezone}>
          {moment.tz.names().map(name => (
            <option key={name}>{name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl as="fieldset" mb={6}>
        <FormLabel as="legend" fontSize="lg" fontWeight="bold">
          Keyword Search
        </FormLabel>
        <Input />
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend" fontSize="lg" fontWeight="bold">
          Formats
        </FormLabel>
        <Box mb={6}>
          {props.formats.map(format => (
            <Button mr={2} mt={2}>
              {format}
            </Button>
          ))}
        </Box>
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend" fontSize="lg" fontWeight="bold">
          Types
        </FormLabel>
        <Box>
          {props.types.map(type => (
            <Button mr={2} mt={2}>
              {type}
            </Button>
          ))}
        </Box>
      </FormControl>
    </Box>
  );
}
