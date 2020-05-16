import { State } from './data';

//set the window query string to match the internal state
export function setQuery(state: State) {
  //build query string
  let query: string[] = [];
  Object.keys(state.filters).forEach(key => {
    const checkedValues = state.filters[key].filter(value => value.checked);
    if (checkedValues.length) {
      query.push(
        key.concat(
          '=',
          checkedValues.map(value => encodeURIComponent(value.tag)).join(',')
        )
      );
    }
  });

  //set query string
  window.history.pushState(
    '',
    '',
    query.length ? '?'.concat(query.join('&')) : window.location.pathname
  );
}
