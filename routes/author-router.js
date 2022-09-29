const express = require("express");

const AuthorController = require("../controllers/author-controller");

const router = express.Router();

router.post("/author", AuthorController.createAuthor);
router.put("/author_readers", AuthorController.updateAuthorReaders);
router.put("/author", AuthorController.updateAuthor)
router.put("/author_times", AuthorController.updateTimes)
router.delete("/author/id", AuthorController.deleteAuthor);
router.get("/authors", AuthorController.getAuthors);
router.get("/author/walletId", AuthorController.getAuthorByWalletId);
router.get("/author_find", AuthorController.getAuthorsByField);

module.exports = router;
