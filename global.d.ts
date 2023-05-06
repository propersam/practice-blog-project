/* eslint-disable no-unused-vars */
// global.d.ts

import { PrismaClient } from "@prisma/client";

export declare global {
  declare module globalThis {
    let prisma: PrismaClient;
  }
}
