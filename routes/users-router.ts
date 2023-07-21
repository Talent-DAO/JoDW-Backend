const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getByUserId);
// router.put("/author_readers", AuthorController.updateAuthorReaders);
// router.put("/author", AuthorController.updateAuthor)
// router.put("/author_times", AuthorController.updateTimes)
// router.delete("/author/id", AuthorController.deleteAuthor);
// router.get("/author/walletId", AuthorController.getAuthorByWalletId);
// router.get("/author_find", AuthorController.getAuthorsByField);

module.exports = router;
