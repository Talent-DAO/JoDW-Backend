const Article = require("../models/article-model");

createArticle = (req, res) => {
  Article.create(
    {
      walletId: req.body.walletId,
      body: req.body.body,
      cover: req.body.cover,
      price: req.body.price,
      title: req.body.title,
      authors: req.body.authors,
      abstract: req.body.abstract,
      blockchain: req.body.blockchain,
      categories: req.body.categories,
      arweaveHash: req.body.arweaveHash,
    },
    (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res
        .status(200)
        .json({ success: true, data: "Article was created successfully." });
    }
  );
};

updateArticle = async (req, res) => { };

deleteArticle = async (req, res) => { };

getArticles = async (req, res) => {
  await Article.find(req.query, (err, article) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!article) {
      return res
        .status(404)
        .json({ success: false, error: "Article not found" });
    }
    return res.status(200).json({ success: true, data: article });
  })
    .clone()
    .catch((err) => console.error(err));
};

getLatestArticles = async (req, res) => {
  // {}, {}, { sort: { 'created_at': -1 } }
  await Article.find({}, {}, { sort: { 'created_at': -1 } }, (err, articles) => {
    if (err) {
      return res.status(400).json({success: false, error: err})
    }

    if(!articles) {
      return res
        .status(404)
        .json({success: false, error: "Article not found"});
    }

    let indexs = []

    articles.forEach((article, index) => {
      indexs.push(article._id)
    })
    return res.status(200).json({success: true, data: indexs})
  })
    .clone()
    .catch((err) => console.error(err))
}

getArticlesByField = async (req, res) => {
  var { field, value } = req.query;
  var regex = { $regex: ".*" + value + ".*" };
  var query = {};
  query[field] = regex;
  await Article.find(query, (err, article) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!article) {
      return res
        .status(404)
        .json({ success: false, error: `Article not found` });
    }
    return res.status(200).json({ success: true, data: article });
  })
    .clone()
    .catch((err) => console.error(err));
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticles,
  getLatestArticles,
  getArticlesByField,
};
