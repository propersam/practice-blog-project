// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import prisma from '@/lib/prisma';
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message: string;
  user?: User;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(" ")[1];
    // check if token is expired
    if (token) {
      const { userId } = jwt.verify(token, process.env.NEXT_API_TOKEN_SECRET || "jwt-secret-key");

      const user = await prisma.user.findFirst({
        where: { id: userId },
      });

      if (!user) {
        return res.status(422).json({
          status: "error",
          message: "Unauthenticated / Invalid Token Authentication",
        });
      } else {
        res.status(200).json({
          message: "User Logged In Successfully",
          status: "success",
          user: user,
        });
      }
    } else {
      // no token received
      return res.status(422).json({
        status: "error",
        message: "Unauthenticated / Invalid Token Authentication",
      });
    }
  } else {
    res.status(424).json({
      status: "error",
      message: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
}
