import produce from 'immer';

// given set => we want to decorate this with produce
export function withImmer(zustandSetOrGetCallback: Function) {
  return function (fn: any) {
    return zustandSetOrGetCallback(produce(fn));
  };
}
