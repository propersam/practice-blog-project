import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { handleAxiosError } from "./helpers";

export const validateUserRequest = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<boolean> => {
  // checking unauthorization/authentication status
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(" ")[1];
    // check if token is expired
    if (token) {
      const { userId } = jwt.verify(token, process.env.NEXT_API_TOKEN_SECRET || "jwt-secret-key");

      const user = await prisma.user.findFirst({
        where: { id: userId },
      });

      if (!user) {
        return false;
      }
    } else {
      // no token received
      return false;
    }
  } catch (error) {
    handleAxiosError(error);
    return false;
  }

  return true;
};
