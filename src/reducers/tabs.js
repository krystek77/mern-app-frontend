
export const TOGGLE_TAB = 'TOGGLE_TAB';

export function openSingleTabReducer(state, action) {
  switch (action.type) {
    case TOGGLE_TAB:
      return state.includes(action.index)
        ? state
        : state.map((i) => action.index);
    default:
      throw new Error(`Action ${action.type} does not exist`);
  }
}

export function openMultipleTabReducer(state, action) {
  switch (action.type) {
    case TOGGLE_TAB:
      return state.includes(action.index)
        ? state.filter((i) => i !== action.index)
        : [...state, action.index];
    default:
      throw new Error(`Action ${action.type} does not exist`);
  }
}