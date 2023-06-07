import axios from "axios";
import { SET_CURRENT_USER, BASE_URL } from "./constants";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AppDispatch } from "../app/store";
import { TypeRegisterData,TypeLoginData,TypeTokenData } from "./actionType";

export const registerUser = (userdata: TypeRegisterData) => (dispatch: AppDispatch) => {
    axios
      .post(`${BASE_URL}/api/users/register`, userdata)
      .then((res) => {
        const navigate = useNavigate();
        navigate("/login");
      })
      .catch((err) => {console.log(err);
      });
  };

export const loginUser = (userdata: TypeLoginData) => (dispatch: AppDispatch) => {
  console.log("here",userdata)

  return axios
    .post(`${BASE_URL}/api/users/login`, userdata)
    .then((res) => {
      const token = res.data.split(" ")[1]
      localStorage.setItem("token", token);
      const decoded:TypeTokenData = jwtDecode(token);
      dispatch(setCurrntUser(decoded));
    })
    .catch((err) => {});
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch(setCurrntUser({name:'',id:'',exp:0,iat:0}))
};

export const setCurrntUser = (decoded:TypeTokenData) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
