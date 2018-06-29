var router = require('express').Router();
var db = require('../models');

// creating a new user
router.post('/users/new', function(req, res) {
  var newUser = req.body;

  db.User.create(newUser)
  .then(function(user) {
    res.redirect('/')
  })
  .catch(function(err) {
    res.json(err)
  })
})

// creating a new account
router.post('/users/:user/accounts/new', function(req, res) {
  var newAccount = req.body;
  newAccount.UserId = req.params.user;

  db.Account.create(newAccount)
  .then(function(account) {
    res.redirect('/users/' + req.params.user)
  })
  .catch(function(err) {
    res.json(err)
  })
})

// creating a new transaction
router.post('/accounts/:account/transactions/new', function(req, res) {
  var newTransaction = req.body;
  newTransaction.AccountId = req.params.account;

  // make sure an account exists at the given ID
  db.Account.findOne({
    where: { id: req.params.account }
  })
  .then(function(account) {
    // update the balance of the account
    if (newTransaction.type === 'deposit') {
      account.dataValues.balance += Number(newTransaction.amount);
    }
    else if (newTransaction.type === 'withdrawal') {
      account.dataValues.balance -= Number(newTransaction.amount);
    }
    db.Account.update(account.dataValues, {
      where: { id: req.params.account }
    })
  })
  .then(function(account) {
    // now we add the transaction to the DB
    db.Transaction.create(newTransaction)
  })
  .then(function(transaction) {
    res.redirect('/accounts/' + req.params.account)
  })
  .catch(function(err) {
    res.json(err)
  })
})

module.exports = router;
