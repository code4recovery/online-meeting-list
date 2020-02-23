import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack
} from "@chakra-ui/core";

import * as moment from "moment-timezone";

type Filter = {
  timezone: string;
  filters: { [key: string]: string[] };
};

export function Filter(props: Filter) {
  return (
    <Stack spacing={6}>
      <FormControl d="block" as="fieldset">
        <FormLabel fontWeight="bold">Your Timezone</FormLabel>
        <Select value={props.timezone}>
          {moment.tz.names().map(name => (
            <option key={name}>{name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl d="block" as="fieldset">
        <FormLabel fontWeight="bold">Keyword Search</FormLabel>
        <Input />
      </FormControl>
      {Object.keys(props.filters).map(filter => (
        <FormControl as="fieldset">
          <FormLabel d="block" fontWeight="bold" pb={0}>
            {filter}
          </FormLabel>
          {props.filters[filter].map(value => (
            <Button
              mr={2}
              mt={2}
              size="sm"
              border="1px"
              borderColor="gray.200"
              color="gray.600"
            >
              {value}
            </Button>
          ))}
        </FormControl>
      ))}
    </Stack>
  );
}
