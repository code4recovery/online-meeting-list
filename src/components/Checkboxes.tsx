import { Box } from '@chakra-ui/react';
import { pushEvent, useData, useInput } from '../helpers';
import { Checkbox } from './Checkbox';

export function Checkboxes({ filter }: { filter: string }) {
  const { filters } = useData();
  const { input, setInput } = useInput();
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {filters[filter].map(value => (
        <Checkbox
          key={value}
          isChecked={input.tags.includes(value)}
          name="tags"
          value={value}
          onChange={e => {
            setInput({
              ...input,
              tags: e.currentTarget.checked
                ? [
                    ...input.tags.filter(
                      tag =>
                        !['days', 'times'].includes(filter) ||
                        !filters[filter].includes(tag)
                    ),
                    value
                  ]
                : input.tags.filter(e => e !== value)
            });
            if (e.currentTarget.checked) {
              pushEvent({ event: 'filter', type: filter, value });
            }
          }}
        />
      ))}
    </Box>
  );
}
