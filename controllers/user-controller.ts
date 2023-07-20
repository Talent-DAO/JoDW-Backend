import { Request, Response } from "express";
const { prisma } = require('../db');

const createUser = (req: Request, res: Response) => {

  prisma.user.create({
    data: {
      chainid: req.body.chainid,
      address: req.body.address,
      profile: {
        create: {
          profilepic: "",
          coverimg: "",
          bio: req.body.bio,
          socials: {},
        },
      },
    },
  })
  .then(() => res.status(200).json({ success: true, data: "Author was created successfully." }))
  .catch((err: any) => res.status(400).json({ success: false, error: err }))
};

const getUsers = (req: Request, res: Response) => {

  prisma.user.findMany()
  .then((items: []) => res.status(200).json({ success: true, data: items }))
  .catch((err: any) => res.status(400).json({ success: false, error: err }))
};

module.exports = {
  createUser,
  getUsers,
}
