import React, { ChangeEvent } from "react";
import moment from "moment-timezone";
import { FormControl, Select, Stack } from "@chakra-ui/core";

import { Search, TagButton } from "./";
import { Tag } from "../helpers";

type Filter = {
  filters: { [key: string]: Tag[] };
  setSearch(search: string): void;
  setTimezone(timezone: string): void;
  toggleTag(filter: string, value: string, checked: boolean): void;
  timezone: string;
};

export function Filter({
  filters,
  setSearch,
  setTimezone,
  toggleTag,
  timezone
}: Filter) {
  return (
    <Stack spacing={6}>
      <FormControl as="fieldset" d="block">
        <Search setSearch={setSearch} />
      </FormControl>
      {Object.keys(filters).map((filter: string, index: number) => (
        <FormControl as="fieldset" key={index}>
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
        <Select
          icon="time"
          iconSize={4}
          onChange={(e: React.FormEvent<HTMLSelectElement>) =>
            setTimezone(e.currentTarget.value)
          }
          value={timezone}
        >
          {moment.tz.names().map((name: string, index: number) => (
            <option key={index}>{name}</option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
