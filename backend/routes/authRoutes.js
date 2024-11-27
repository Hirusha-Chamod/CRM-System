const express = require('express');
const { signup, login, logout, authCheck } = require('../controllers/authController');
const { protectRoute } = require('../middlewear/protectRoute');

const router = express.Router();


router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.get("/authCheck", protectRoute, authCheck)

module.exports = router;