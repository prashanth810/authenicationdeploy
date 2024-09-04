const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/Expensescontroller');

const router = require('express').Router();

// fetch expense from user id || get all expenses 

router.get('/', fetchExpenses);

// post new expenses 

router.post('/', addExpenses);

// delete particular expense with using id 

router.delete('/:expenseId', deleteExpenses);

module.exports = router;