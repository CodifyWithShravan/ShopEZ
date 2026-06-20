const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  getPerformance,
} = require('../controllers/portfolioController');

// No auth required
router.get('/', getPortfolio);
router.get('/performance', getPerformance);

module.exports = router;
