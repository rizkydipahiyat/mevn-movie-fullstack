import Post from "../models/posts.js";
import fs from "fs";
// get all posts
export const fetchAllPost = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

// get post by id
export const fetchById = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await Post.findById(id);
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

// create a psot
export const createPost = async (req, res) => {
	const post = req.body;
	const imagename = req.file.filename;
	post.image = imagename;
	try {
		await Post.create(post);
		res.status(201).json({ msg: "Post created successfully!" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

// update a post
export const updatePost = async (req, res) => {
	const id = req.params.id;
	let new_image = "";
	if (req.file) {
		new_image = req.file.filename;
		try {
			fs.unlinkSync("./uploads/" + req.body.old_image);
		} catch (error) {
			console.log(error);
		}
	} else {
		new_image = req.body.old_image;
	}
	const newPost = req.body;
	newPost.image = new_image;
	try {
		await Post.findByIdAndUpdate(id, newPost);
		res.status(200).json({ msg: "Post updated successfully!" });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

// delete a post
export const deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Post.findByIdAndDelete(id);
		if (result.image != "") {
			try {
				fs.unlinkSync("./uploads/" + result.image);
			} catch (error) {
				console.log(error);
			}
		}
		res.status(200).json({ msg: "Post deleted successfully!" });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};
