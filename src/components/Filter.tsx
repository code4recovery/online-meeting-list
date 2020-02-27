import React, { useState } from "react";
import moment from "moment-timezone";
import { Button, FormControl, Select, Stack } from "@chakra-ui/core";

import { ButtonTag, Search } from "./";
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
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing={{ xs: 3, md: 6 }}>
      <FormControl>
        <Search setSearch={setSearch} />
      </FormControl>
      <Stack
        d={{ xs: open ? "block" : "none", md: "block" }}
        spacing={{ xs: 3, md: 6 }}
      >
        {Object.keys(filters).map((filter: string, index: number) => (
          <FormControl key={index}>
            {filters[filter].map((value: Tag, index: number) => (
              <ButtonTag
                filter={filter}
                key={index}
                toggleTag={toggleTag}
                value={value.tag}
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
      <FormControl d={{ md: "none" }}>
        <Button
          bg="white"
          onClick={() => {
            setOpen(!open);
          }}
          rightIcon={open ? "chevron-up" : "chevron-down"}
          variant="outline"
          w="100%"
        >
          {open ? "Close" : "Filters"}
        </Button>
      </FormControl>
    </Stack>
  );
}
