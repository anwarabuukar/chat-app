import { Router } from "express";
const router = Router();

router.get("/helo", (req, res) => {
  res.json("Welcome to Chat");
});

router.post("/login", (req, res) => {
  return;
});

router.post("/register", (req, res) => {
  return;
});
export { router as rootRouter };
