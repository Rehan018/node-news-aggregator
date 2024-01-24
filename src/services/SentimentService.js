const natural = require('natural');

class SentimentService {
  static analyzeSentiment(text) {
    try {
      const analyzer = new natural.SentimentAnalyzer('English');
      const stemmer = new natural.PorterStemmer();

      const stemmerTokens = stemmer.tokenizeAndStem(text);
      const sentiment = analyzer.getSentiment(stemmerTokens);

      return sentiment;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return 0;
    }
  }
}

module.exports = SentimentService;
