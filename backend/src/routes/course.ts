import { Router } from "express";
const courseRouter = Router();
import { courseModel, purchaseModel } from "../database/db";
import userMiddleware from "../middleware/user";

// @ts-ignore
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});

courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

export default courseRouter;
