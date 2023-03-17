import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import router from "./routes/Index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);
app.listen(8000, () => console.log("Server Up and Running..."));
