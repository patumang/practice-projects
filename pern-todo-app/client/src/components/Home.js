import { Fragment } from 'react';
import { Link } from 'react-router-dom';

//components

import InputTask from './Task/InputTask';

const Home = () => {
  return (
    <Fragment>
      <div className='container'>
        <InputTask />
      </div>
    </Fragment>
  );
};
export default Home;
