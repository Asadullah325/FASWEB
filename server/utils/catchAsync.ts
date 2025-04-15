// utils/catchAsync.ts
import { RequestHandler } from "express";

export const catchAsync = (fn: (...args: any[]) => Promise<any>): RequestHandler =>
  (req, res, next) => fn(req, res, next).catch(next);
