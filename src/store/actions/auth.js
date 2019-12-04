import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkTimer = timer => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, timer * 1000);
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = isSignup
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYWHyp7BOZdRPZ7E-VnL3AWQKfiXJiJ5g"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYWHyp7BOZdRPZ7E-VnL3AWQKfiXJiJ5g";
    Axios.post(url, data)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkTimer(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        const data = {
          idToken: token,
          localId: userId
        };
        dispatch(authSuccess(data));
        dispatch(
          checkTimer((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
