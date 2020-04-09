const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  topics: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ],
  bookmarkstories: [
    {
      story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stories'
      }
    }
  ],
  readinglater: [
    {
      story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stories'
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
