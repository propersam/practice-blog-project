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
  // PUT /api/posts/publish/:id
  if (req.method === "PUT") {
    const postId = req.query.id as string;

    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });

    res.status(200).json({
      message: "Post Published Successfully",
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
