import { Request, Response } from "express";
import prisma from '../db/index.js';

const createDocument = (req: Request, res: Response) => {
  
  prisma.document.create({
    data: {
      uploader: parseInt(req.body.uploader),
      url: req.file?.filename || '',
      contentType: req.file?.mimetype || '',
      size: req.file?.size || 0,
      // @ts-ignore
      md5hash: req.file?.md5hash || '',
    },
  })
    .then((item: any) => res.status(200).json({ success: true, data: item }))
    .catch((err: any) => {
      console.error(err);
      res.status(400).json({ success: false, error: err })
    })
}

const DocumentController = {
  createDocument,
}

export default DocumentController;
