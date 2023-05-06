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
  sms_verified_at?: Date | null;
  email_verified_at?: Date | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, password } = req.body;

  if (req.method === "POST") {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user)
      return res.status(422).json({
        status: "error",
        message: "Incorrect Email / Password",
      });

    bcrypt
      .compare(password, user?.password ?? "")
      .then((resp) => {
        // resp === true
        if (!resp) {
          return res.status(422).json({
            status: "error",
            message: "Incorrect Email / Password",
          });
        }
      })
      .catch((err) => {
        return res.status(422).json({
          status: "error",
          message: "Failed to Login: \n" + err?.message,
        });
      });

    const token = jwt.sign({ userId: user?.id }, process.env.NEXT_API_TOKEN_SECRET || "jwt-secret-key", {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User Logged In Successfully",
      status: "success",
      token: token,
      expiry: 60 * 60 * 24, // 1 day
      sms_verified_at: user?.smsVerifiedAt,
      email_verified_at: user?.emailVerifiedAt,
    });
  } else {
    res.status(424).json({
      status: "error",
      message: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
}
