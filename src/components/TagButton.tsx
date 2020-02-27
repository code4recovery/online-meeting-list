import React, { useState } from "react";
import { Button } from "@chakra-ui/core";

type TagButton = {
  filter: string;
  value: string;
  toggleTag(filter: string, value: string, checked: boolean): void;
};

export function TagButton({ filter, value, toggleTag }: TagButton) {
  const [checked, setChecked] = useState(false);
  const colors = {
    bg: checked ? "gray.900" : "gray.100",
    color: checked ? "gray.100" : "gray.600"
  };
  return (
    <Button
      {...colors}
      border="1px"
      borderColor="gray.200"
      mr={2}
      my={1}
      onClick={e => {
        setChecked(!checked);
        toggleTag(filter, value, !checked);
      }}
      size="sm"
      _active={colors}
      _hover={{
        bg: checked ? "gray.800" : "gray.200",
        color: checked ? "gray.100" : "gray.600"
      }}
    >
      {value}
    </Button>
  );
}
