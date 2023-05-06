// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message: string;
  token?: string;
  expiry?: number;
  sms_verified_at?: string;
  email_verified_at?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name, lastname, email, address, phone } = req.body;
  const password = bcrypt.hashSync("Password.123", 9);

  if (req.method === "POST") {
    const userExist = await prisma.user.findFirst({
      where: { email },
    });

    if (userExist)
      return res.status(422).json({
        status: "error",
        message: "Email already in use!",
      });

    const user = await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        password,
        address,
        phone,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.NEXT_API_TOKEN_SECRET || "jwt-secret-key", {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User Registered Successfully",
      status: "success",
      token: token,
      expiry: 60 * 60 * 24, // 1 day
    });
  } else {
    res.status(424).json({
      status: "error",
      message: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
}
