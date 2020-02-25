import React, { ChangeEvent } from "react";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";

type Search = {
  setSearch(search: string): void;
};

export function Search({ setSearch }: Search) {
  return (
    <InputGroup>
      <InputLeftElement children={<Icon color="gray.300" name="search-2" />} />
      <Input
        placeholder="Search"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //setSearch(e.target.value);
        }}
      />
    </InputGroup>
  );
}
