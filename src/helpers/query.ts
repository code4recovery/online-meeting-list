import { State } from './types';

//set the window query string to match the internal state
export function setQuery(state: State) {
  const params = new URLSearchParams({});

  ['days', 'formats', 'types'].forEach(filter => {
    const val = state.filters[filter]
      .filter(({ checked }) => checked)
      .map(({ tag }) => tag)
      .join();

    if (val) {
      params.set(filter, val);
    }
  });

  const str = params.toString();

  window.history.pushState(
    '',
    '',
    str.length ? `?${str}` : window.location.pathname
  );
}
