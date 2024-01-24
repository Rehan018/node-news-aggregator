
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ef44a074e9034713846c50d014963771');
class NewsApiHandler {
    constructor(apiKey) {
      this.newsapi = new NewsAPI(apiKey);
    }
  
    async fetchNewsByKeywords(keywords) {
      try {
        const response = await this.newsapi.v2.everything({
          q: keywords.join(' '),
          language: 'en',
          sortBy: 'relevancy',
        });
  
        const newsData = response.articles || [];
  
        return newsData;
      } catch (error) {
        console.error('Error fetching news articles:', error);
        return [];
      }
    }
  }
  
  module.exports = NewsApiHandler;
  
