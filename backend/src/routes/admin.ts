import { Router } from "express";
const adminRouter = Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_ADMIN_PASSWORD } from "../config";
import { adminModel, courseModel } from "../database/db";
import adminMiddleware from "../middleware/admin";
import { signupBodySchema } from "../types/signup";
import { z } from "zod";
import { signinBodySchema } from "../types/signin";

type signupBodyType = z.infer<typeof signupBodySchema>;

adminRouter.post("/signup", async (req, res) => {
  const { success, data, error } = signupBodySchema.safeParse(req.body);

  if (!success) {
    res.json({
      message: "Incorrect format",
      error: error,
    });
    return;
  }

  const signupBody: signupBodyType = data;

  const existingUser = await adminModel.findOne({
    email: signupBody.email,
  });

  if (existingUser) {
    res.status(411).json({
      message: "Email already taken or incorrect inputs",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(signupBody.password, 5);

    const admin = await adminModel.create({
      email: signupBody.email,
      password: hashedPassword,
      firstName: signupBody.firstName,
      lastName: signupBody.lastName,
    });

    const adminId = admin._id;

    const token = jwt.sign(
      {
        adminId,
      },
      JWT_ADMIN_PASSWORD as string
    );

    res.json({
      message: "Signup successfull",
      token: token,
    });
  } catch (error) {
    res.json({
      message: "Admin already exist",
    });
  }
});

type signinBodyType = z.infer<typeof signinBodySchema>;

adminRouter.post("/signin", async (req, res) => {
  const signinBody: signinBodyType = req.body;

  const admin = await adminModel.findOne({
    email: signinBody.email,
  });

  if (!admin) {
    res.status(403).json({
      message: "User in not found on the database",
    });
  }

  const passwordMatch = await bcrypt.compare(
    signinBody.password,
    // @ts-ignore
    admin.password
  );

  if (passwordMatch) {
    const token = jwt.sign(
      {
        // @ts-ignore
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
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price, level } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    level: level,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course updated",
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    courses,
  });
});

export default adminRouter;
