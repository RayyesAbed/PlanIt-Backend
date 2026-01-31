import { Request } from "express";

const getCookie = (req: Request, name: string) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
};
