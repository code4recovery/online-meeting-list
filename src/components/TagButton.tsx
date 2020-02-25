import React, { useState } from "react";
import { Button } from "@chakra-ui/core";

type TagButton = {
  value: string;
  toggleClicked(clicked: boolean): void;
};

export function TagButton({ value, toggleClicked }: TagButton) {
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      border="1px"
      backgroundColor={clicked ? "gray.900" : "gray.100"}
      borderColor="gray.200"
      color={clicked ? "gray.100" : "gray.600"}
      onClick={e => {
        setClicked(!clicked);
        toggleClicked(!clicked);
      }}
      mr={2}
      mt={2}
      size="sm"
    >
      {value}
    </Button>
  );
}
