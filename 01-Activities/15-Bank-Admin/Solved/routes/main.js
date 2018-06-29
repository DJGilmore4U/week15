var router = require('express').Router();
var db = require('../models');

// homepage
router.get('/', function(req, res) {
  db.User.findAll({
    include: [{
      model: db.Account,
      include: [db.Transaction]
    }]
  })
  .then(function(users) {
    res.render('users', { Users: users })
  })
})

// redirect to homepage if they want to view users
// since that's all the homepage does
router.get('/users', function(req, res) {
  res.redirect('/')
})

// getting a specific user
router.get('/users/:user', function(req, res) {
  db.User.findOne({
    where: {
      id: req.params.user
    },
    include: [db.Account]
  })
  .then(function(user) {
    res.render('user', { user: user })
  })
  .catch(function(err) {
    res.json(err)
  })
})

// getting all accounts
router.get('/accounts', function(req, res) {
  db.Account.findAll({})
  .then(function(accounts) {
    res.render('accounts', { accounts: accounts })
  })
})

// getting a specific account
router.get('/accounts/:id', function(req, res) {
  db.Account.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Transaction]
  })
  .then(function(account) {
    res.render('account', { account: account })
  })
  .catch(function(err) {
    res.json(err)
  })
})

// getting all transactions
router.get('/transactions', function(req, res) {
  db.Transaction.findAll({})
  .then(function(transactions) {
    res.render('transactions', { transactions: transactions })
  })
})

module.exports = router;
