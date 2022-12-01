const { Schema } = require("mongoose");

const Tag = new Schema(
  {
    [key]: { type: String, required: false },
  }
);

const Attribute = new Schema(
  {
    [key]: {
      value: { type: String, required: false },
      traitType: { type: String, required: false },
      displayType: { type: String, required: false },
    }
  }
);

const Media = new Schema(
  {
    [key]: {
      item: { type: String, required: false },
      type: { type: String, required: false },
      altTag: { type: String, required: false },
    },
    attributes: { type: Attribute, required: false },
    appId: { type: String, required: false },
  }
);

const Comment = new Schema(
  {
    pubId: { type: String, required: false },
    timestamp: { type: String, required: false },
  }
);

const PublicationContent = new Schema(
  {
    version: { type: String, required: false },
    animation_url: { type: String, required: false },
    metadata_id: { type: String, required: false },
    description: { type: String, required: false },
    locale: { type: String, required: false },
    tags: { type: Tag, required: false },
    mainContentFocus: { type: String, required: false },
    content: { type: String, required: false },
    external_url: { type: String, required: false },
    image: { type: String, required: false },
    imageMimeType: { type: String, required: false },
    name: { type: String, required: false },
    media: { type: Media, required: false },
    attributes: { type: [Attribute], required: false },
    createdOn: { type: String, required: false },
    appId: { type: String, required: false },
  }
);

const Publication = new Schema({
  id: { type: String, required: false },
  pubId: { type: String, required: false },
  author: { type: String, required: false },
  content: { type: PublicationContent, required: false },
  comments: { type: [Comment], required: false },
  contentURI: { type: String, required: false },
  timestamp: { type: Number, required: false },
});

module.exports = mongoose.model("publications", Publication);
