import {useContext} from 'react'
import axios from 'axios';
import { returnErrors } from './errorActions';
import { Context } from "../../flux/store";
import {getLikes} from './likeActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_ALL_LIKE
} from "./types";
// const { dispatch } = useContext(Context);
// Check token & load user
export const loadUser = (dispatch, auth) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(auth.token))
    .then(res =>{
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      // getLikes(res.data.email, dispatch, auth.token);
      return res.data;
    })
    .then((data)=>{
      getLikes(data.email, dispatch, auth.token);
      console.log("data.user", data.email);
      console.log("auth.token", auth.token);
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password }, dispatch) => {
  // Headers
  console.log('register');
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      return res.data;
    })
    .then(data => {
      getLikes(data.user.email, dispatch, data.token);
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }, dispatch) => {
  
  console.log('login')
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res => {
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      return res.data;
    })
    .then(data => {
      getLikes(data.user.email, dispatch, data.token);
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = (dispatch) => {
  dispatch( {
    type: LOGOUT_SUCCESS
  })
  dispatch({
    type: DELETE_ALL_LIKE
  });
};

// Setup config/headers and token
export const tokenConfig = authToken => {
  // Get token from localstorage
  const token = authToken;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
