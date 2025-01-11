import { Router, Request, Response } from "express";
const adminRouter: any = Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_ADMIN_PASSWORD } from "../config";
import { adminModel, courseModel } from "../database/db";
import adminMiddleware from "../middleware/admin";
import { signupBodySchema } from "../types/signup";
import { z } from "zod";
import { signinBodySchema } from "../types/signin";

type signupBodyType = z.infer<typeof signupBodySchema>;

adminRouter.post("/signup", async (req: Request, res: Response) => {
  const { success, data, error } = signupBodySchema.safeParse(req.body);

  try {
    if (!success) {
      res.json({
        message: "Incorrect format",
        error: error,
      });
      return;
    }

    const signupBody: signupBodyType = data;

    const existingAdmin = await adminModel.findOne({
      email: signupBody.email,
    });

    if (existingAdmin) {
      return res.status(403).json({
        message: "Admin already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(signupBody.password, 5);

    const admin = await adminModel.create({
      email: signupBody.email,
      password: hashedPassword,
      firstName: signupBody.firstName,
      lastName: signupBody.lastName,
    });

    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD as string
    );

    res.json({
      message: "Signup successfull",
      token: token,
    });
  } catch (error) {
    res.status(403).json({
      message: "Admin already exist",
    });
  }
});

type signinBodyType = z.infer<typeof signinBodySchema>;

adminRouter.post("/signin", async (req: Request, res: Response) => {
  const signinBody: signinBodyType = req.body;

  try {
    const admin = await adminModel.findOne({
      email: signinBody.email,
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      signinBody.password,

      admin.password as string
    );

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        JWT_ADMIN_PASSWORD as string
      );

      res.json({
        message: "Login successfull",
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Admin does not exist",
    });
  }
});

adminRouter.post(
  "/course",
  adminMiddleware,
  async (req: Request, res: Response) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price, level, duration } = req.body;

    const course = await courseModel.create({
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
      level: level,
      duration: duration,
      creatorId: adminId,
    });

    res.json({
      message: "Course created",
      courseId: course._id,
    });
  }
);

adminRouter.put(
  "/course/:id",
  adminMiddleware,
  async (req: Request, res: Response) => {
    const adminId = req.userId;
    const courseId = req.params.id;

    const { title, description, imageUrl, duration, price, level } = req.body;

    await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        description: description,
        imageUrl: imageUrl,
        title: title,
        price: price,
        level: level,
        duration: duration,
      }
    );

    res.json({
      message: "Course updated",
    });
  }
);

adminRouter.delete(
  "/course/:id",
  adminMiddleware,
  async (req: Request, res: Response) => {
    const adminId = req.userId;
    const courseId = req.params.id;

    await courseModel.deleteOne({
      _id: courseId,
      creatorId: adminId,
    });

    res.json({
      message: "Course deleted",
    });
  }
);

adminRouter.get(
  "/course/bulk",
  adminMiddleware,
  async (req: Request, res: Response) => {
    const adminId = req.userId;

    const courses = await courseModel
      .find({
        creatorId: adminId,
      })
      .populate("creatorId", "firstName");

    res.json({
      courses,
    });
  }
);

export default adminRouter;
