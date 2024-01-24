const NewsArticle = require('../models/NewsArticle.js');
const NewsApiHandler = require('../utils/newsApiHandler.js');
const newsApiHandler = new NewsApiHandler('f44a074e9034713846c50d014963771');
class NewsService {
  static async fetchNewsByKeywords(keywords) {
    try {
      const newsData = await newsApiHandler.fetchNewsByKeywords(keywords);
      const savedArticles = [];

      for (const article of newsData) {
        const savedArticle = await NewsArticle.create({
          title: article.title || 'Untitled',
          description: article.description || 'No description available.',
          url: article.url || 'https://www.nytimes.com/international/',
          publishedAt: new Date(article.publishedAt),
          keywords: article.keywords || [],
        });
        savedArticles.push(savedArticle);
      }

      return savedArticles;
    } catch (error) {
      console.error('Error in NewsService:', error);
      throw error;
    }
  }
}

module.exports = NewsService;
