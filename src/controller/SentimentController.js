const SentimentService = require("../services/SentimentService.js");
class SentimentController {
  static async analyzeSentiment(req, res) {
    try {
      const { text } = req.body;
      const sentimentsScore = SentimentService.analyzeSentiment(text);
      res.status(201).json({ message: "Sentiment analysis successful", sentimentsScore });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error during sentiment analysis" });
    }
  }
}

module.exports=SentimentController;