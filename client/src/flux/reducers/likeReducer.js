import {
  GET_LIKES,
  ADD_LIKE,
  DELETE_LIKE,
  LIKES_LOADING,
  DELETE_ALL_LIKE,
  SET_JOIN
} from "../actions/types";

export const likeInitialState = {
  likes: [],
  loading: false,
  initial: false
};

export default function(state, action) {
  switch (action.type) {
    case GET_LIKES:
      return {
        ...state,
        likes: action.payload,
        loading: false,
        initial: true
      };
    case DELETE_LIKE:
      return {
        ...state,
        likes: state.likes.filter(
          (item) =>
            item.serial_no !== action.payload.serial_no &&
            item.acadm_year != action.payload.acadm_year &&
            item.acadm_term != action.payload.acadm_term
        ),
      };
    case DELETE_ALL_LIKE:
      return {
        ...state,
        likes: []
      };
    case ADD_LIKE:
      return {
        ...state,
        likes: [action.payload, ...state.likes]
      };
    case SET_JOIN:
      return {
        ...state,
        likes: state.likes.map(item=>{if (
                                        item.serial_no == action.payload.serial_no &&
                                        item.acadm_year == action.payload.acadm_year &&
                                        item.acadm_term == action.payload.acadm_term
                                      ) {
                                        item.isJoin = !item.isJoin;
                                      }return item})
      };
    case LIKES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}