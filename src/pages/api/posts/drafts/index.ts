// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateUserRequest } from "@/lib/apiValidation";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message: string;
  data?: Post | Post[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!validateUserRequest(req, res))
    return res.status(422).json({
      status: "error",
      message: "Unauthorized / Invalid Token Authentication",
    });

  // main actions now comes in next below
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      where: { published: false },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    res.status(200).json({
      message: "Posts Drafts fetched Successfully",
      status: "success",
      data: posts,
    });
  } else {
    res.status(424).json({
      status: "error",
      message: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
}
