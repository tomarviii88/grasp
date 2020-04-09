const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Profile = require('../../models/Profile');

//@route /api/users/
//@desc Post route to register a user
//@access Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be minimum of length of 6').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //See if the user exist
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exsist' }] });
      }

      const users = new User({
        name,
        email,
        password
      });

      //Encrypt the password
      const salt = await bcyrpt.genSalt(10);
      users.password = await bcyrpt.hash(password, salt);
      await users.save();

      //Create profile
      const profileField = {
        user: users.id,
        name: users.name
      };

      const profile = new Profile(profileField);
      await profile.save();

      //Generate json webtoken
      const payload = {
        user: {
          id: users.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
