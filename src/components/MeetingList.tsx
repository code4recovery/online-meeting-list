import React from "react";

import { Stack } from "@chakra-ui/core";

import { Meeting } from "../types";

import { MeetingEntry } from "./MeetingEntry";

type MeetingList = {
  meetings: Meeting[];
};

export function MeetingList({ meetings }: MeetingList) {
  return (
    <Stack spacing={8} shouldWrapChildren={true}>
      {meetings.map(meeting => (
        <MeetingEntry meeting={meeting} />
      ))}
    </Stack>
  );
}
