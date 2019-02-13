const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/:ticker', async (req, res, next) => {
  try {
    const ticker = req.params.ticker;
    const response = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/book`
    );
    const data = response.data;
    res.json(data);
  } catch (err) {
    res.json(err.response.data);
  }
});

router.get('/group/:symbols', async (req, res, next) => {
  try {
    const symbols = req.params.symbols;
    const response = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`
    );
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.log(err.response.data);
  }
});
