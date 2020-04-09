const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const profileFields = {
      user: req.user.id,
      name: user.name
    };

    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          $set: profileFields
        },
        {
          new: true
        }
      );
      return res.json(profile);
    }

    //Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Get my profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Get all the profiles
router.get('/', auth, async (req, res) => {
  try {
    let profiles = await Profile.find();
    let profile_req = profiles.filter(
      profile => profile.user.toString() !== req.user.id.toString()
    );
    res.json(profile_req);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Add the followed topics
router.put('/follow-topic/:title', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    //console.log(req.params.title.toLowerCase());
    if (
      profile.topics.filter(topic => topic.name === req.params.title).length > 0
    ) {
      return res.status(400).json({ msg: 'Topic already followed' });
    }
    profile.topics.unshift({ name: req.params.title });
    //profile.topics.unshift({ name: req.params.title.toLowerCase() });

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unfollow-topic/:title', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.topics
      .map(topic => topic.name)
      .indexOf(req.params.title);
    profile.topics.splice(removeIndex, 1);
    await profile.save();
    //profile.topics.splice(topic => topic.name === req.params.title);

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/follow-people/:user_id', auth, async (req, res) => {
  try {
    let profile_main = await Profile.findOne({ user: req.user.id });
    if (
      profile_main.following.filter(
        people => people.user === req.params.user_id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Already following the user' });
    }

    profile_main.following.unshift({ user: req.params.user_id });
    await profile_main.save();
    res.json(profile_main);

    let profile_secondary = await Profile.findOne({ user: req.params.user_id });
    if (
      profile_secondary.followers.filter(people => people.user === req.user.id)
    ) {
      return res.status(400).status({ msg: 'Already a follower' });
    }

    profile_secondary.followers.unshift({ user: req.user.id });
    await profile_secondary.save();
    //console.log(profile_main);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unfollow-people/:user_id', auth, async (req, res) => {
  try {
    let profile_main = await Profile.findOne({ user: req.user.id });
    let removeIndex = profile_main.following
      .map(people => people.user)
      .indexOf(req.params.user_id);
    profile_main.following.splice(removeIndex, 1);
    await profile_main.save();

    let profile_secondary = await Profile.findOne({ user: req.params.user_id });
    removeIndex = profile_secondary.followers
      .map(people => people.user)
      .indexOf(req.user.id);
    await profile_secondary.save();

    res.json(profile_main);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/bookmark/:story_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.bookmarkstories.unshift({ story: req.params.story_id });
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/deletebookmark/:story_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.bookmarkstories
      .map(story => {
        story.story;
      })
      .indexOf(req.params.story_id);
    profile.bookmarkstories.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/deletereadinglist/:story_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.readinglater
      .map(story => {
        story.story;
      })
      .indexOf(req.params.story_id);
    profile.readinglater.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/readinglist/:story_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.readinglater.unshift({ story: req.params.story_id });
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
