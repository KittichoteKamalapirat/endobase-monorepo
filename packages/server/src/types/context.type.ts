import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';
// import { createUpvoteLoader } from "./utils/createUpvoteLoader";

export type RequestWithSession = Request & {
  session?: Session & { userId?: string };
};

export type MyContext = {
  // req: Request & { session: Express.Session };
  req: RequestWithSession;
  res: Response;
  redis: Redis;
};
