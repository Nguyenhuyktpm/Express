import { Session } from "express-session";
import { Request } from "express";

declare module "express" {
  interface Request {
    session: Session;
  }
}
