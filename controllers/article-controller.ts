import { Request, Response } from "express";
import { prisma } from '../db/index.js';

const createArticle = (req: Request, res: Response) => {
  // TODO: validate content types for image & content by looking at document
  // TODO: validate author matches document owner/uploader
  prisma.article.create({
    data: {
      title: req.body.title,
      imageId: req.body.imageId,
      contentId: req.body.contentId,
      published: false,
      authorId: req.body.authorId, // replace with current user based on auth info,
      topics: {
        create: req.body.topics.map((topicId: Number) => { topicId })
      }
    },
  })
    .then((item: any) => res.status(200).json({ success: true, data: item }))
    .catch((err: any) => {
      console.error(err);
      res.status(400).json({ success: false, error: err })
    })
}

const ArticleController = {
  createArticle,
}

export default ArticleController;
