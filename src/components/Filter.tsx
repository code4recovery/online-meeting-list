import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
        <InputGroup>
          <InputLeftElement
            children={<Icon name="search-2" color="gray.300" />}
          />
          <Input placeholder="Search" />
        </InputGroup>
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
              onClick={e => {
                console.log(value);
              }}
            >
              {value}
            </Button>
          ))}
        </FormControl>
      ))}
      <FormControl d="block" as="fieldset">
        <FormLabel fontWeight="bold">Your Timezone</FormLabel>
        <Select value={props.timezone}>
          {moment.tz.names().map(name => (
            <option key={name}>{name}</option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
