import express from 'express';
import Stock from '../models/Stock';

const router = express.Router();

router.get('/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stocks = await Stock.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(stocks);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router;
