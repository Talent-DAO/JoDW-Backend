const express = require("express");

const ArticleController = require("../controllers/article-controller");

const router = express.Router();

router.post("/article", ArticleController.createArticle);
router.put("/article/walletId", ArticleController.updateArticle);
router.delete("/article/walletId", ArticleController.deleteArticle);
router.get("/articles", ArticleController.getArticles);
router.get("/articles_latest", ArticleController.getLatestArticles);
router.get("/article_find", ArticleController.getArticlesByField);

module.exports = router;
