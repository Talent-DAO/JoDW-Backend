const Author = require("../models/author-model");

createAuthor = (req, res) => {
  Author.create({
    username: req.body.username,
    bio: req.body.bio,
    aboutme: req.body.aboutme,
    twitter: req.body.twitter,
    linkedin: req.body.linkedin,
    walletId: req.body.walletId,
    authorImage: req.body.authorImage,
    coverImage: req.body.coverImage,
    readers: req.body.readers,
    times_cited: req.body.times_cited,
    popularCategories: req.body.popularCategories
  }, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: "Author was created successfully." });
  })
};

deleteAuthor = async (req, res) => {
  await Author.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res
      .status(200)
      .json({ success: true, data: "Author was deleted successfully." });
  }).clone().catch((err) => console.error(err));
};

updateAuthorReaders = async (req, res) => {
  await Author.updateOne({ walletId: req.body.walletId }, { readers: req.body.readers }, (err, author) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: author });
  }).clone().catch((err) => console.error(err));
};

updateAuthor = async (req, res) => {
  await Author.updateOne({ _id: req.body.id }, {
    username: req.body.username,
    bio: req.body.bio,
    aboutme: req.body.aboutme,
    twitter: req.body.twitter,
    linkedin: req.body.linkedin,
    walletId: req.body.tipAddress,
    authorImage: req.body.authorImage,
    coverImage: req.body.authorCoverImage,
    readers: req.body.readers,
    times_cited: req.body.times_cited,
    popularCategories: req.body.popularCategories
  }, (err, author) => {
    if(err) {
      return res.status(400).json({success: false, error: err})
    }
    return res.status(200).json({success: true, data: author});
  }).clone().catch((err) => console.error(err));
}

updateTimes = async (req, res) => {
  await Author.updateOne({ walletId: req.body.walletId }, { times_cited: req.body.timesCited }, (err, author) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: author });
  }).clone().catch((err) => console.error(err));
}

getAuthors = async (req, res) => {
  await Author.find(req.query, (err, authors) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!authors.length) {
      return res
        .status(200)
        .json({ success: false, error: "Authors not found" });
    }
    return res.status(200).json({ success: true, data: authors });
  }).clone().catch((err) => console.error(err));
};

getAuthorByWalletId = async (req, res) => {
  await Author.find({ walletId: req.query.walletId }, (err, author) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!author.length) {
      return res
        .status(200)
        .json({ success: false, error: "Author not found" });
    }
    return res.status(200).json({ success: true, data: author });
  }).clone().catch((err) => console.error(err));
};

getAuthorsByField = async (req, res) => {
  var { field, value } = req.query
  var regex = { $regex: '.*' + value + '.*' };
  var query = {}
  query[field] = regex;

  await Author.find(query, (err, author) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!author) {
      return res
        .status(404)
        .json({ success: false, error: `Author not found` });
    }
    return res.status(200).json({ success: true, data: author });
  }).clone().catch((err) => console.error(err));
}

module.exports = {
  createAuthor,
  deleteAuthor,
  updateAuthor,
  updateAuthorReaders,
  updateTimes,
  getAuthors,
  getAuthorsByField,
  getAuthorByWalletId,
};
