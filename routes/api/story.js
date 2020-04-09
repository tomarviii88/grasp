const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Story = require('../../models/Story');
const Profile = require('../../models/Profile');

//Post the story(save as draft)
router.post(
  '/saveasdraft',
  auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('tagline', 'Tag Line is required')
      .not()
      .isEmpty(),
    check('imgsrc', 'Image URL is required')
      .not()
      .isEmpty(),
    check('topic', 'Topic is required')
      .not()
      .isEmpty(),
    check('content', 'Content is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, tagline, imgsrc, topic, content } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const newStory = new Story({
        user: req.user.id,
        title: title,
        tagline: tagline,
        imgsrc: imgsrc,
        topic: topic,
        content: content,
        authorname: user.name,
        saveasdraft: true,
        publish: false
      });

      await newStory.save();
      res.json(newStory);
    } catch (err) {
      console.log(err.messgae);
      res.status(500).send('Server Error');
    }
  }
);

//Get the current users stories
router.get('/my-stories', auth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).sort({ date: -1 });
    res.json(stories);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//get the story using id
router.get('/read/:story_id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.story_id);
    res.json(story);
    //console.log('err');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//get the stories from the topic i have followed
router.get('/stories/followed-topics', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const topics_following = profile.topics;
    //console.log(topics_following);
    //res.json(topics_following);
    const stories = await Story.find().sort({ date: -1 });
    //res.json(stories);
    //console.log(profile.user);
    let selected_story = [];

    for (var i = 0; i < topics_following.length; i++) {
      for (var j = 0; j < stories.length; j++) {
        if (
          topics_following[i].name === stories[j].topic &&
          stories[j].authorname !== profile.name
        ) {
          selected_story.unshift(stories[j]);
        }
      }
    }
    selected_story;

    res.json(selected_story);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/stories/followed-people', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const people_following = profile.following;

    const stories = await Story.find().sort({ date: -1 });
    let selected_story = [];

    for (var i = 0; i < people_following.length; i++) {
      for (var j = 0; j < stories.length; j++) {
        if (
          people_following[i].user.toString() === stories[j].user.toString()
        ) {
          selected_story.unshift(stories[j]);
        }
      }
    }

    res.json(selected_story);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Like the story
router.put('/like/:story_id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.story_id);
    story.likes.unshift({ user: req.user.id });
    await story.save();

    res.json(story);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//unlike the story
router.put('/unlike/:story_id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.story_id);
    const removeIndex = story.likes.map(like => like.user).indexOf(req.user.id);
    story.likes.splice(removeIndex, 1);
    await story.save();
    res.json(story);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/comment/:story_id',
  auth,
  [
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const story = await Story.findById(req.params.story_id);
      const user = await User.findById(req.user.id);

      const newComment = {
        user: user.id,
        text: req.body.text,
        name: user.name
      };

      story.comments.unshift(newComment);
      await story.save();

      res.json(story);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/delete/:comment_id/:story_id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.story_id);
    const removeIndex = story.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);
    story.comments.splice(removeIndex, 1);
    await story.save();
    res.json(story);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/story/:user_id', auth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.params.user_id });
    res.json(stories);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/stories/:topic', auth, async (req, res) => {
  try {
    const stories = await Story.find({ topic: req.params.topic });
    res.json(stories);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/readinglist', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const stories = await Story.find().sort({ date: -1 });
    const readinglist = [];
    for (var i = 0; i < profile.readinglater.length; i++) {
      for (var j = 0; j < stories.length; j++) {
        if (
          profile.readinglater[i].story.toString() === stories[j].id.toString()
        ) {
          readinglist.unshift(stories[j]);
        }
      }
    }

    res.json(readinglist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/bookmark', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const stories = await Story.find().sort({ date: -1 });
    const readinglist = [];
    for (var i = 0; i < profile.bookmarkstories.length; i++) {
      for (var j = 0; j < stories.length; j++) {
        if (
          profile.bookmarkstories[i].story.toString() ===
          stories[j].id.toString()
        ) {
          readinglist.unshift(stories[j]);
        }
      }
    }

    res.json(readinglist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
