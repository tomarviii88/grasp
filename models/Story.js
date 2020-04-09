const mongoose = require('mongoose');
const StorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  authorname: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  imgsrc: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  saveasdraft: {
    type: Boolean,
    required: true
  },
  publish: {
    type: Boolean,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Story = mongoose.model('story', StorySchema);
