import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

app.use("/api/post", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
