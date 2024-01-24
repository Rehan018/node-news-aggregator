const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  keywords: {
    type: [String],
    default: [],
  },
  sentimentsScore: {
    type: Number,
    default: 0,
  },
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;
