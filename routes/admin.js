const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../config/auth');

router.get('/', verifyAdmin, (req, res) => {
  res.render('admin/dashboard')
});

module.exports = router
