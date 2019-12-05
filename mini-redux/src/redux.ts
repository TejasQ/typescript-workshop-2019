export type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "square" }
  | { type: "add random number to state"; numberToAdd: number };

type ChangeHandler<State> = (newState: State) => void;

export type Store<State, GenericAction> = {
  getState: () => State;
  dispatch: (action: GenericAction) => void;
  subscribe: (changeHandler: ChangeHandler<State>) => void;
};

export const counterReducer = (state: number, action: CounterAction): typeof state => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "square":
      return Math.pow(state, 2);
    case "add random number to state":
      return state + action.numberToAdd;
    default:
      return state;
  }
};

export const createStore = <T, U>(initialReducer: (state: T, action: U) => T, initialState: T): Store<T, U> => {
  let state = initialState;
  const subscribers: Array<ChangeHandler<T>> = [];

  return {
    getState: () => state,
    dispatch: action => {
      state = initialReducer(state, action);
      subscribers.forEach(s => s(state));
    },
    subscribe: changeHandler => {
      subscribers.push(changeHandler);
    },
  };
};
