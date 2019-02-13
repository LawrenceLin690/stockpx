const router = require('express').Router();
const { Purchase } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;

router.post('/:id', async (req, res, next) => {
  try {
    const order = await Purchase.create(req.body);
    res.json(order);
  } catch (err) {
    console.log(err.response.data);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let holdings = await Purchase.findAll({
      where: {
        userId: req.params.id,
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(holdings);
  } catch (err) {
    console.log(err.response.data);
  }
});

router.get('/grouped/:id', async (req, res, next) => {
  try {
    let holdings = await Purchase.findAll({
      where: {
        userId: req.params.id,
      },
      attributes: [
        'ticker',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalAmount'],
      ],
      group: ['ticker'],
    });
    res.json(holdings);
  } catch (err) {
    console.log(err.response.data);
  }
});
