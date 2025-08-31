const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, deleteAllTransactions } = require('../controllers/transactions');

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction)
  .delete(deleteAllTransactions);

router
  .route('/:id')
  .delete(deleteTransaction);

module.exports = router;