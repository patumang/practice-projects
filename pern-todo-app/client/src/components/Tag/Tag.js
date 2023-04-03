import { Fragment } from 'react';
import { Link } from 'react-router-dom';

//components

import InputTag from './InputTag';
import ListTags from './ListTags';

const Tag = () => {
  return (
    <Fragment>
      <h2>Tags</h2>

      <div className='container'>
        <InputTag />
        <ListTags />
      </div>
    </Fragment>
  );
};
export default Tag;
