import express from 'express'
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import { register, login, uploadAvatar } from '../controllers/userControllers.js'
const router = express.Router();

router.post("/auth/register", upload.single("avatar"), register);
router.post("/auth/login", login);
router.post("/auth/avatar", protect, upload.single("avatar"), uploadAvatar
);

router.get("/auth/profile", protect, async (req, res) => {
    res.json(req.user);
});

export default router;




