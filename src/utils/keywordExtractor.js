const natural = require('natural');

class KeywordExtractor {
  static extractKeywords(text) {
    try {
      const tokenizer = new natural.WordTokenizer();
      const stemmer = natural.PorterStemmer;
      const stemmedTokens = tokenizer
        .tokenize(text)
        .map((token) => stemmer.stem(token));

      const politicallyRelevantWords = [
        'government',
        'economy',
        'policy',
        'tax',
        'education',
        'healthcare',
        'jobs',
        'security',
        'environment',
        'rights',
        'freedom',
        'justice',
      ];

      const wordScore = {};
      stemmedTokens.forEach((token) => {
        wordScore[token] = (wordScore[token] || 0) + 1;
        if (politicallyRelevantWords.includes(token)) {
          wordScore[token] += 2;
        }
      });

      const numberOfKeywords = 10; // Adjust as needed
      const keywords = Object.entries(wordScore)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => entry[0])
        .slice(0, numberOfKeywords);

      return keywords;
    } catch (error) {
      console.error('Error extracting keywords:', error);
      return [];
    }
  }
}

module.exports = KeywordExtractor;
