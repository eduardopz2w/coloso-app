import Immutable from 'immutable';

export default function keyIn(...keys) {
  const keySet = Immutable.Set(keys);
  return (v, k) => keySet.has(k);
}
