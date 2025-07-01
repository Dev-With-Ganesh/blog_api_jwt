const mongoose = require('mongoose');
const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  register
);

router.post(
    '/login',
    [
      body('username').isLength({ min: 3 }),
      body('password').isLength({ min: 6 }),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      next();
    },
    login
);
         

// Export the router
module.exports = router;