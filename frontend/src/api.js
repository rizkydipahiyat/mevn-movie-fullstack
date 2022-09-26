import axios from "axios";

const url = "http://localhost:5000/api/post";

export const getAllPost = async () => {
	const { data } = await axios.get(url);
	return data;
};

export const getPostById = async (id) => {
	const { data } = await axios.get(`${url}/${id}`);
	return data;
};
export const addPost = async (post) => {
	const { data } = await axios.post(url, post);
	return data;
};
export const updatePost = async (id, post) => {
	const { data } = await axios.patch(`${url}/${id}`, post);
	return data;
};
export const deletePost = async (id) => {
	const { data } = await axios.delete(`${url}/${id}`);
	return data;
};
