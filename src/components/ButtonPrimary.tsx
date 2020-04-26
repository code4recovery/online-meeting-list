import React from "react";
import { Button } from "@chakra-ui/core";

type ButtonPrimary = {
  icon: "link" | "email" | "phone";
  link: string;
  text: string;
  title: string;
};

export function ButtonPrimary({ icon, link, text, title }: ButtonPrimary) {
  return (
    <Button
      bg="blue.600"
      color="white"
      leftIcon={icon}
      mr={2}
      mt={3}
      onClick={() => window.open(link, "_blank")}
      title={title}
      _hover={{ bg: "blue.800" }}
    >
      {text}
    </Button>
  );
}
