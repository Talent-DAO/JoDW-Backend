import express from "express";
import multer from 'multer';
import ArweaveStorageEngine from "../storage/arweave/ArweaveStorageEngine.js";

// handle file uploads
const upload = multer({ storage: new ArweaveStorageEngine() }).single('doc')

import DocumentController from "../controllers/document-controller.js";

const router = express.Router();

router.post("/documents", upload, DocumentController.createDocument);

export default router;
