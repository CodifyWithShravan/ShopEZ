const express = require('express');
const router = express.Router();
const {
  buyStock,
  sellStock,
  getTradeHistory,
} = require('../controllers/tradeController');

// No auth required
router.post('/buy', buyStock);
router.post('/sell', sellStock);
router.get('/history', getTradeHistory);

module.exports = router;
