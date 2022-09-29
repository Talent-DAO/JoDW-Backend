const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    link: { type: String, required: false },
    subject: { type: String, required: false },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("contacts", Contact);
