export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return typeof payload === 'undefined' ? { type } : { type, payload };
}

export const SET_EXCLUDE_RULES = 'SET_EXCLUDE_RULES';

export const SettingsActions = {
  setExcludeRules: (payload: string[]) => createAction(SET_EXCLUDE_RULES, payload),
};

type FunctionType = (...args: any[]) => any;
interface ActionCreatorsMapObject { [creator: string]: FunctionType; }
type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type Actions = ActionsUnion<typeof SettingsActions>;
