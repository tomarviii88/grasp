import React, { useEffect, useState, Profiler, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getStoryById,
  likeStory,
  unlikeStory,
  commentStory,
  deleteComment
} from '../../actions/story';
import {
  getCurrentProfile,
  bookmark,
  readLater,
  deleteBookmark,
  deleteReadlater
} from '../../actions/profile';
import { setAlert } from '../../actions/alert';

const Story = ({
  getStoryById,
  likeStory,
  story: { story },
  profile: { profile },
  getCurrentProfile,
  unlikeStory,
  setAlert,
  commentStory,
  deleteComment,
  bookmark,
  readLater,
  deleteBookmark,
  deleteReadlater,
  match
}) => {
  useEffect(() => {
    getCurrentProfile();
    getStoryById(match.params.story_id);
  }, []);

  const [formData, setFormData] = useState({
    text: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    commentStory(story._id, formData);
    setFormData({ text: '' });
  };

  const { text } = formData;

  const updateLike = () => {
    if (
      story.likes.length > 0 &&
      profile &&
      story.likes.filter(like => like.user === profile.user).length > 0
    ) {
      unlikeStory(story._id);
    } else {
      likeStory(story._id);
    }
  };

  //const [likeButton, setLikeButton] = useState();
  return (
    story && (
      <div className='story-super-container'>
        <div className='story-container'>
          <h1>{story.title}</h1>
          <h5>Category : {story.topic}</h5>
          <img src={story.imgsrc} />
          <p style={{ color: 'gray' }}>{story.tagline}</p>
          <br />
          <p>{story.content}</p>
          <div className='like-container'>
            <button
              onClick={() => {
                updateLike(story._id);
              }}
            >
              {story.likes.length > 0 &&
              profile &&
              story.likes.filter(like => like.user === profile.user).length >
                0 ? (
                <img src='https://image.flaticon.com/icons/svg/535/535183.svg' />
              ) : (
                <img src='https://image.flaticon.com/icons/svg/535/535285.svg' />
              )}
            </button>
            <p>{story.likes.length}</p>
          </div>
          <div className='story-comment-container'>
            <form onSubmit={e => onSubmit(e)}>
              <input
                type='text'
                placeholder='Enter text'
                value={text}
                onChange={e => setFormData({ text: e.target.value })}
                required
              />
              <input type='submit' value='Comment' />
            </form>
            <div className='story-comments'>
              {story.comments.length > 0 ? (
                story.comments.map(comment => (
                  <Fragment>
                    <div className='story-comment'>
                      <div className='story-cancel-container'>
                        <h5>{comment.name}</h5>
                        {comment.user === profile.user && (
                          <button
                            onClick={() => {
                              deleteComment(comment._id, story._id);
                            }}
                          >
                            <img src='https://image.flaticon.com/icons/svg/458/458594.svg' />
                          </button>
                        )}
                      </div>

                      <p>{comment.text}</p>
                    </div>
                  </Fragment>
                ))
              ) : (
                <Fragment>
                  <p>Be the first one to comment</p>
                </Fragment>
              )}
            </div>
          </div>
          {}
        </div>
        {profile.user !== story.user && (
          <div className='bookmark-readlater-container'>
            {profile.bookmarkstories.filter(
              stories => stories.story === story._id
            ).length > 0 ? (
              <button
                className='blue-button'
                onClick={() => {
                  deleteBookmark(story._id);
                }}
              >
                Bookmarked
              </button>
            ) : (
              <button
                className='blue-button'
                onClick={() => {
                  bookmark(story._id);
                }}
              >
                Bookmark
              </button>
            )}
            {profile.readinglater.filter(stories => stories.story === story._id)
              .length > 0 ? (
              <button
                className='blue-button'
                onClick={() => {
                  deleteReadlater(story._id);
                }}
              >
                Added to ReadLater
              </button>
            ) : (
              <button
                className='blue-button'
                onClick={() => {
                  readLater(story._id);
                }}
              >
                ReadLater
              </button>
            )}
          </div>
        )}
      </div>
    )
  );
};

Story.propTypes = {};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getStoryById,
  likeStory,
  getCurrentProfile,
  unlikeStory,
  setAlert,
  commentStory,
  deleteComment,
  bookmark,
  readLater,
  deleteBookmark,
  deleteReadlater
})(Story);
