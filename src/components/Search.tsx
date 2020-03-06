import React, { ChangeEvent } from "react";
import {
  Icon,
  //IconButton,
  Input,
  InputGroup,
  InputLeftElement
  //InputRightElement
} from "@chakra-ui/core";

type Search = {
  setSearch(search: string[]): void;
};

export function Search({ setSearch }: Search) {
  return (
    <InputGroup>
      <InputLeftElement>
        <Icon color="gray.300" name="search-2" />
      </InputLeftElement>
      <Input
        aria-label="Search"
        placeholder="Search"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(
            e.target.value
              .toLowerCase()
              .split(" ")
              .filter(e => e)
          );
        }}
      />
      {/*
      <InputRightElement>
        <IconButton
          aria-label="Clear search"
          bg="transparent"
          color="gray.300"
          icon="small-close"
          onClick={() => {}}
        ></IconButton>
      </InputRightElement>
      */}
    </InputGroup>
  );
}
