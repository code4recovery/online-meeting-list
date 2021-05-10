import { State } from './types';

//set the window query string to match the internal state
export function setQuery(state: State) {
  //build query string
  let query: string[] = [`lang=${state.language}`];

  //add filters
  Object.keys(state.filters).forEach(key => {
    const checkedValues = state.filters[key].filter(value => value.checked);
    if (checkedValues.length) {
      query.push(
        key.concat(
          '=',
          checkedValues.map(value => value.tag.replaceAll(' ', '+')).join(',')
        )
      );
    }
  });

  //set query string
  window.history.pushState('', '', `?${query.join('&')}`);
}
