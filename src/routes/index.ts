import { Express, Request, Response } from "express";
import { createShortUrl, getShortUrl } from "../controller/shortUrl.controller";
import validateResource from "../middleware/validateResource";
import shortUrlSchema from "../schemas/createShortUrl.schema";

function routes(app: Express) {
  app.post("/api/url",validateResource(shortUrlSchema), createShortUrl);

  app.get("/:shortId", getShortUrl);
}

export default routes;
