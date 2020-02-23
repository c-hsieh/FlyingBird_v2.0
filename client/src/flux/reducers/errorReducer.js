import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

export const errorInitialState = {
  msg: {},
  status: null,
  id: null
}
export default function (state, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      console.log("CLEAR_ERRORS");
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}