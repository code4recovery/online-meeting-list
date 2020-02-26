import React from "react";
import moment from "moment-timezone";
import { FormControl, FormLabel, Select, Stack } from "@chakra-ui/core";

import { Search, TagButton } from "./";
import { Tag } from "../helpers";

type Filter = {
  filters: { [key: string]: Tag[] };
  setSearch(search: string): void;
  toggleTag(filter: string, value: string, checked: boolean): void;
  timezone: string;
};

export function Filter({ filters, setSearch, toggleTag, timezone }: Filter) {
  return (
    <Stack spacing={6}>
      <FormControl as="fieldset" d="block">
        <Search setSearch={setSearch} />
      </FormControl>
      {Object.keys(filters).map((filter: string, index: number) => (
        <FormControl as="fieldset" key={index}>
          <FormLabel d="block" fontWeight="bold" pb={0}>
            {filter}
          </FormLabel>
          {filters[filter].map((value: Tag, index: number) => (
            <TagButton
              filter={filter}
              value={value.tag}
              key={index}
              toggleTag={toggleTag}
            />
          ))}
        </FormControl>
      ))}
      <FormControl d="block" as="fieldset">
        <FormLabel fontWeight="bold">Your Timezone</FormLabel>
        <Select onChange={() => console.log(timezone)} value={timezone}>
          {moment.tz.names().map((name: string, index: number) => (
            <option key={index}>{name}</option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
