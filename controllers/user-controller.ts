import { Request, Response } from "express";
const { prisma } = require('../db');

const createUser = (req: Request, res: Response) => {

  prisma.user.create({
    data: {
      chainId: req.body.chainid,
      address: req.body.address,
      profile: {
        create: {
          name: req.body.name,
          profilepic: "",
          coverimg: "",
          bio: req.body.bio,
          socials: {},
        },
      },
    },
  })
    .then(() => res.status(200).json({ success: true, data: "Author was created successfully." }))
    .catch((err: any) => {
      console.error(err);
      res.status(400).json({ success: false, error: err })
    })
};

const getUsers = (req: Request, res: Response) => {

  const query = {
    take: 10,
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      chainId: true,
      address: true,
      status: true,
      profile: {
        select: {
          name: true,
          profilepic: true,
          bio: true,
        }
      },
    }
  };

  let cursor = {};
  let filter = {};

  if (req.query.next) {
    cursor = {
      skip: 1,
      cursor: {
        id: parseInt(req.query.next.toString()),
      },
    }
  }

  if (req.query.chainId || req.query.name) {
    let chainPredicate = {};
    let namePredicate = {};

    if (req.query.chainId) {
      chainPredicate = {
        chainId: {
          equals: parseInt(req.query.chainId.toString())
        }
      }
    }

    if (req.query.name) {
      namePredicate = {
        profile: {
          name: {
            contains: req.query.name,
          }
        }
      }
    }

    filter = {
      where: { ...chainPredicate, ...namePredicate }
    }
  }

  prisma.user.findMany({ ...query, ...cursor, ...filter })
    .then((items: [any]) => res.status(200).json({ success: true, data: items, next: items[items.length - 1]?.id }))
    .catch((err: any) => {
      console.error(err);
      res.status(400).json({ success: false, error: err });
    })
};

const getByUserId = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ success: false, error: "A user ID must be specified!" })
    return;
  }

  prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    select: {
      id: true,
      chainId: true,
      address: true,
      status: true,
      profile: {
        select: {
          name: true,
          profilepic: true,
          bio: true,
        }
      },
    },
  })
    .then((user: any) => res.status(200).json({ success: true, data: user }))
    .catch((err: any) => {
      console.error(err);
      res.status(400).json({ success: false, error: err })
    })
}

module.exports = {
  createUser,
  getUsers,
  getByUserId,
}
