import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { saveAsDraft } from '../../actions/story';
import { withRouter } from 'react-router-dom';

const NewStoryForm = ({ explore: { topics_data }, saveAsDraft, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    imgsrc: '',
    topic: 'ART',
    content: ''
  });

  const { title, tagline, imgsrc, topic, content } = formData;

  const onChangeSelect = e => {
    setFormData({
      ...formData,
      topic: e.target.value
    });
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Fragment>
      <Navbar />
      <div className='new-story-form-container'>
        <form>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <input
            type='text'
            placeholder='Tag-line'
            name='tagline'
            value={tagline}
            onChange={e => onChange(e)}
            required
          />
          <input
            type='text'
            placeholder='Image URL'
            name='imgsrc'
            value={imgsrc}
            onChange={e => onChange(e)}
            required
          />
          <select name='topic' value={topic} onChange={e => onChangeSelect(e)}>
            {topics_data.topics.map(topic => (
              <option value={topic.title}>{topic.title} </option>
            ))}
          </select>
          <textarea
            name='content'
            value={content}
            onChange={e => onChange(e)}
            required
          />
          <div className='publish-saveasdraft'>
            <input
              type='button'
              value='Save as Draft'
              onClick={() => {
                saveAsDraft(formData, history);
              }}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

NewStoryForm.propTypes = {};

const mapStateToProps = state => ({
  explore: state.explore
});

export default connect(mapStateToProps, { saveAsDraft })(
  withRouter(NewStoryForm)
);
