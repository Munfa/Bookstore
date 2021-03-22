const express = require('express');
const Category = require('../models/category');
const { addItemToCart } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

module.exports = router;