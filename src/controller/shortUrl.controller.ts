import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  const { destination } = req.body;

  const shortURL = await shortUrl.create({ destination });

  res.send(shortURL);
}

export async function getShortUrl(req: Request, res: Response) {
  const { shortId } = req.params;

  const shortURL = await shortUrl.findOne({ shortId }).lean();

  if (!shortURL) {
    res.sendStatus(404);
  }

  analytics.create({ shortUrl: shortURL?._id });
  res.redirect(shortURL?.destination as string);
}

// export async function getAnalytics(req:Request,res:Response) {
//   const data=await analytics.find({}).lean();
//   res.send(data)

// }
