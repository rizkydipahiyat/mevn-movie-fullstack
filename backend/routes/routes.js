import express from "express";
import {
	createPost,
	deletePost,
	fetchAllPost,
	fetchById,
	updatePost,
} from "../controllers/api.js";
import multer from "multer";

// multer middleware
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

let upload = multer({
	storage: storage,
}).single("image");

const router = express.Router();

router.get("/", fetchAllPost);
router.get("/:id", fetchById);
router.post("/", upload, createPost);
router.patch("/:id", upload, updatePost);
router.delete("/:id", deletePost);

export default router;
