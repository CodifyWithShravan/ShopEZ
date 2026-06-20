const express = require('express');
const router = express.Router();
const {
  getAllStocks,
  searchStocks,
  getStockById,
  getTopGainers,
  getTopLosers,
  getSectors,
} = require('../controllers/stockController');

// No auth required - public routes
router.get('/', getAllStocks);
router.get('/search', searchStocks);
router.get('/top-gainers', getTopGainers);
router.get('/top-losers', getTopLosers);
router.get('/sectors', getSectors);
router.get('/:id', getStockById);

module.exports = router;
