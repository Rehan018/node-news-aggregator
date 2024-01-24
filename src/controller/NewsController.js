// src/controllers/NewsController.js
const NewsService = require('../services/NewsService.js');

class NewsController {
  static async getNewsByKeywords(req, res) {
    try {
      const { keywords } = req.query;

      if (!keywords || !Array.isArray(keywords)) {
        return res.status(400).json({ message: 'Invalid keywords provided' });
      }

      const newsArticles = await NewsService.fetchNewsByKeywords(keywords);
      res.json({ message: 'News fetched successfully', newsArticles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error during news fetching' });
    }
  }
}

module.exports = NewsController;
