const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { JWT_ADMIN_PASSWORD } = require("../config");
const course = require("./course");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async (req, res) => {
  // todo: adding zod validation
  const requireBody = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
  });

  const parseDataSuccess = requireBody.safeParse(req.body);

  if (!parseDataSuccess.success) {
    res.json({
      message: "Incorrect format",
      error: parseDataSuccess.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  let errorThrown = false;
  try {
    // todo: hash the password so that plain text password will not get stored in the db
    const hashedPassword = await bcrypt.hash(password, 5);

    // todo: add try catch
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    res.json({
      message: "Admin already exist",
    });
    errorThrown = true;
  }
  if (!errorThrown) {
    res.json({
      message: "Sign up succeeded",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // todo: ideally password should be hashed, and hence you can't compare the user provided password and the database password
  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.status(403).json({
      message: "User in not found on the database",
    });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    // todo: do cookie logic

    res.json({
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
  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
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

  const course = await adminModel.updateOne(
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
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const courses = await adminModel.find({
    creatorId: adminId,
  });

  res.json({
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
