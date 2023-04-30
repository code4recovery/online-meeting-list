import { Box } from '@chakra-ui/react';
import { useAppState } from '../helpers';
import { Checkbox } from './Checkbox';

export function Checkboxes({ filter }: { filter: string }) {
  const { state } = useAppState();

  return (
    <Box display="flex" gap={3} flexWrap="wrap">
      {state.filters[filter].map(value => (
        <Checkbox
          key={value}
          isChecked={state.tags.includes(value)}
          name={filter}
          value={value}
        />
      ))}
    </Box>
  );
}
