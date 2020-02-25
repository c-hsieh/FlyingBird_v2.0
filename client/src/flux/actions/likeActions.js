import axios from "axios";
import {
  GET_LIKES,
  ADD_LIKE,
  DELETE_LIKE,
  LIKES_LOADING,
  DELETE_ALL_LIKE,
  SET_JOIN
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getLikes = (email, dispatch, authToken) => {
  dispatch(setItemsLoading());
  // console.log("getLikes");

  // Request body
  const body = JSON.stringify({ email });

  axios
    .post("/api/like/getLike", body, tokenConfig(authToken))
    .then(res =>{
      dispatch({
        type: GET_LIKES,
        payload: res.data
      });
      console.log("getLikes", res.data);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addLike = (email, like, dispatch, auth) => {
  // Request body
  const body = JSON.stringify({ email, like });

  axios
    .post("/api/like/addLike", body, tokenConfig(auth.token))
    .then(res =>
      dispatch({
        type: ADD_LIKE,
        payload: like
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setJoin = (email, serial_no, isJoin, dispatch, auth) => {
  // Request body
  const body = JSON.stringify({ email, serial_no, isJoin });
  console.log("setJoin", body);
  axios
    .post("/api/like/setJoin", body, tokenConfig(auth.token))
    .then(res =>
      dispatch({
        type: SET_JOIN,
        payload: serial_no
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteLike = (email, serial_no, dispatch, auth) => {
  
  // Request body
  const body = JSON.stringify({ email, serial_no });
  console.log("deleteLike", body);
  axios
    .post("/api/like/deleteLike", body, tokenConfig(auth.token))
    .then(res =>
      dispatch({
        type: DELETE_LIKE,
        payload: serial_no
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteALLLike = (email, dispatch, auth) => {
  // Request body
  const body = JSON.stringify({ email });

  axios
    .post("/api/like/deleteALLLike", body, tokenConfig(auth.token))
    .then(res =>
      dispatch({
        type: DELETE_ALL_LIKE
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: LIKES_LOADING
  };
};
