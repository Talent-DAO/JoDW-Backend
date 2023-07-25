import { Request, Response } from "express";
const { prisma } = require('../db');

const createArticle = (req: Request, res: Response) => {
  prisma.user.create({
    data: {
      title: req.body.title,
      image: req.body.image,
      content: req.body.content,
      published: false,
      user: req.body.userId, // replace with current user based on auth info,
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

module.exports = {
  createArticle,
}