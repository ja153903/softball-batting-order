import produce from 'immer';

export function withImmer(zustandSetOrGetCallback: Function) {
  return function (fn: any) {
    return zustandSetOrGetCallback(produce(fn));
  };
}
