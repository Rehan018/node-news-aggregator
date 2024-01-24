const express = require('express');
const NewsController = require('../controller/NewsController.js');

const newsRouter=express.Router();

newsRouter.get('/news',NewsController.getNewsByKeywords);
module.exports=newsRouter;