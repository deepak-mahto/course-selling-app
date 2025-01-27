import { Router, Request, Response } from "express";
const courseRouter: any = Router();
import { courseModel, purchaseModel } from "../database/db";
import userMiddleware from "../middleware/user";

courseRouter.post(
  "/purchase",
  userMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { courseId, imageUrl, title, duration, level, creatorName } =
      req.body;

    await purchaseModel.create({
      userId,
      courseId,
      imageUrl,
      title,
      duration,
      level,
      creatorName,
    });

    res.json({
      message: "You have successfully bought the course",
    });
  }
);

courseRouter.get("/preview", async (req: Request, res: Response) => {
  const courses = await courseModel.find({}).populate("creatorId", "firstName");
  res.json({
    courses,
  });
});

export default courseRouter;
