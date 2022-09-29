const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new Schema({
  filename: { type: String, required: true },
  data: { type: String, required: true },
});

const Article = new Schema(
  {
    walletId: { type: String, required: true },
    body: { type: File, required: false },
    cover: { type: File, required: false },
    price: { type: String, required: false },
    title: { type: String, required: true },
    authors: { type: Array, required: true },
    abstract: { type: String, required: true },
    blockchain: { type: String, required: true },
    categories: { type: Array, required: false },
    arweaveHash: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('articles', Article);
