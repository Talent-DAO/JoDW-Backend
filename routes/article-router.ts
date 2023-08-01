import express from "express";
import multer from 'multer';
import ArweaveStorageEngine from "../storage/arweave/ArweaveStorageEngine.js";

// handle file uploads
const upload = multer({ storage: new ArweaveStorageEngine() }).single('doc')

import ArticleController from "../controllers/article-controller.js";

const router = express.Router();

router.post("/articles", upload, ArticleController.createArticle);
// router.put("/article/walletId", ArticleController.updateArticle);
// router.delete("/article/walletId", ArticleController.deleteArticle);
// router.get("/articles", ArticleController.getArticles);
// router.get("/articles_latest", ArticleController.getLatestArticles);
// router.get("/article_find", ArticleController.getArticlesByField);

export default router;
