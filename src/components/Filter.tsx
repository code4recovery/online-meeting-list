import React from "react";

import {
  Box,
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Divider,
  Select,
  Input
} from "@chakra-ui/core";

import * as moment from "moment-timezone";

type Filter = {
  timezone: string;
  formats: string[];
  types: string[];
};

export function Filter(props: Filter) {
  return (
    <Box w="100%" h="10">
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
        <Divider />
        <CheckboxGroup variantColor="green" defaultValue={[]} mb={6}>
          {props.formats.map(format => (
            <Checkbox value={format}>{format}</Checkbox>
          ))}
        </CheckboxGroup>
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend" fontSize="lg" fontWeight="bold">
          Types
        </FormLabel>
        <Divider />
        <CheckboxGroup variantColor="green" defaultValue={[]}>
          {props.types.map(type => (
            <Checkbox value={type}>{type}</Checkbox>
          ))}
        </CheckboxGroup>
      </FormControl>
    </Box>
  );
}
