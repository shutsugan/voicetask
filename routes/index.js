const router = require('express').Router();
//const index = require('./controllers/index');

router.route('/')
  .get(function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

module.exports = router;
