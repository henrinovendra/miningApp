import express from "express";
import {
  getData,
  getDataById,
  saveData,
  updateData,
  updateStatus,
  deleteData,
  maxSj,
} from "../Controllers/DataController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {getUsers, Register,Login, Logout} from "../Controllers/UserController.js";
import { refreshToken } from "../Controllers/RefreshToken.js";

const router = express.Router();
router.get("/api/data", getData);
router.get("/api/data/:id", getDataById);
router.get("/api/maxsj", maxSj);
router.post("/api/data",verifyToken, saveData);
router.patch("/api/data/:id",verifyToken, updateData);
router.delete("/api/data/:id", deleteData);
router.patch("/api/status/:id", updateStatus);

router.get('/users',verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);





export default router;
