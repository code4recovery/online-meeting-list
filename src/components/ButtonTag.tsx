import React, { useState } from "react";
import { Button } from "@chakra-ui/core";

type ButtonTag = {
  filter: string;
  value: string;
  toggleTag(filter: string, value: string, checked: boolean): void;
};

export function ButtonTag({ filter, value, toggleTag }: ButtonTag) {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      bg={checked ? "gray.900" : "gray.100"}
      border="1px"
      borderColor="gray.200"
      color={checked ? "gray.100" : "gray.600"}
      mr={2}
      my={1}
      onClick={e => {
        setChecked(!checked);
        toggleTag(filter, value, !checked);
      }}
      size="sm"
      _hover={{
        bg: checked ? "gray.800" : "gray.200",
        color: checked ? "gray.100" : "gray.600"
      }}
    >
      {value}
    </Button>
  );
}
