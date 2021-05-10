import axios from "axios";
const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => { return axios.post(url, newPost) };
export const updatePost = (id, updatedPost) => { return axios.patch(`${url}/${id}`, updatedPost) }
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);