// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateUserRequest } from "@/lib/apiValidation";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!validateUserRequest(req, res))
    return res.status(422).json({
      status: "error",
      message: "Unauthorized / Invalid Token Authentication",
    });

  // main actions now comes in next below
  // GET /api/posts/:id
  if (req.method === "GET") {
    const postId = String(req?.query?.id);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: { name: true, id: true },
        },
      },
    });
    if (!post?.id)
      res.status(404).json({
        message: "Post Not Found",
        status: "error",
        data: null,
      });

    res.status(200).json({
      message: "Post Detail Fetched",
      status: "success",
      data: post,
    });
  } else {
    res.status(424).json({
      status: "error",
      message: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
}
