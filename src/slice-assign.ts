import robodux, { AnyState, ActionsAny } from './slice';
import { NoEmptyArray } from './reducer';

export const cap = (t: string) => t.charAt(0).toUpperCase() + t.substr(1);

interface Params<SS, S> {
  initialState: NoEmptyArray<SS>;
  slice: keyof S;
}

export default function mapSlice<
  SS = any,
  A extends ActionsAny = any,
  S extends AnyState = AnyState
>({ slice, initialState }: Params<SS, S>) {
  return robodux<SS, A, S>({
    slice,
    initialState,
    actions: {
      [`set${cap(<string>slice)}`]: (s: SS, p: SS) => p,
      [`reset${cap(<string>slice)}`]: () => initialState,
    } as any,
  });
}