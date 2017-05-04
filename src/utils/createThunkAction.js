/* eslint-disable no-param-reassign*/

export default function createThunkAction(type, action) {
  action.toString = () => type;

  return action;
}
