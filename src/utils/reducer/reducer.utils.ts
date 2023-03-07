import { AnyAction } from "redux";

export type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function isMatchable<AC extends () => AnyAction>(
  actionCreator: AC
): Matchable<AC>;
export function isMatchable<AC extends (...args: any[]) => AnyAction>(
  actionCreator: AC
): Matchable<AC>;

export function isMatchable(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type Action<T> = {
  type: T;
};

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T, P>(type: T, payload: P) {
  return { type, payload };
}
