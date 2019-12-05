import { Store, CounterAction, createStore, counterReducer } from "../redux";

type PizzaAction = { type: "add pineapples" } | { type: "remove pineapples" };
const pizzaReducer = (state: string, action: PizzaAction) => {
  switch (action.type) {
    case "add pineapples":
      return "ooh noooo that's no tpizza br0000";
    case "remove pineapples":
      return "God bless you";
    default:
      return state;
  }
};

describe("redux tests", () => {
  let store: Store<number, CounterAction>;

  beforeEach(() => {
    store = createStore(counterReducer, 0);
  });
  it("should get state", () => {
    expect(store.getState()).toBe(0);
  });
  it("should update state when I dispatch an action", () => {
    expect(store.getState()).toBe(0);
    store.dispatch({ type: "increment" });
    expect(store.getState()).toBe(1);
    store.dispatch({ type: "increment" });
    expect(store.getState()).toBe(2);
    store.dispatch({ type: "increment" });
    expect(store.getState()).toBe(3);
    store.dispatch({ type: "increment" });
    expect(store.getState()).toBe(4);
    store.dispatch({ type: "square" });
    expect(store.getState()).toBe(16);
  });
  it("should respond to state updates", () => {
    const changeHandler = jest.fn();
    expect(store.getState()).toBe(0);
    store.subscribe(newState => changeHandler(newState));
    store.dispatch({ type: "decrement" });
    expect(store.getState()).toBe(-1);
    expect(changeHandler).toHaveBeenCalledWith(-1);
  });
});
