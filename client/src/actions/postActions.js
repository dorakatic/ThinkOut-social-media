import axios from "axios";
import {
  ADD_POST,
  GET_POSTS,
  LOADING_POSTS,
  UPDATE_POST,
  DELETE_POST,
  LIKE,
  UNLIKE,
} from "../constants";
//import { Redirect } from "react-router-dom";

export const addPost = (postData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/posts/add", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getPosts = () => (dispatch) => {
  dispatch(loadPosts);
  axios
    .get("http://localhost:5000/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

//refresh and update

export const refreshPost = (postId) => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/posts`)
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
//

export const getPostsByFollowingUsers = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/posts/following")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

//novo

export const likePost = (postId, userId) => (dispatch) => {
  axios
    .post(`http://localhost:5000/api/posts/user/${userId}/like`, { postId })
    .then((res) =>
      dispatch({
        type: LIKE,
        payload: res.data.postId,
      })
    )
    .catch((err) => console.log(err));
};

export const unlikePost = (postId, userId) => (dispatch) => {
  axios
    .post(`http://localhost:5000/api/posts/user/${userId}/unlike`, { postId })
    .then((res) =>
      dispatch({
        type: UNLIKE,
        payload: res.data.postId,
      })
    )
    .catch((err) => console.log(err));
};

//kraj

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/posts/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
      window.location.reload();
    })
    .catch((err) => console.log(err));
};

export const updatePost = (postId, postData) => (dispatch) => {
  axios
    .put(`http://localhost:5000/api/posts/post/${postId}`, postData)
    .then((res) => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data.postData,
      });
      window.location.reload();
    })
    .catch((err) => console.log(err));
};

export const loadPosts = () => {
  return {
    type: LOADING_POSTS,
  };
};
