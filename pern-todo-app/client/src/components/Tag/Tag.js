import { Fragment } from 'react';

import Box from '@mui/material/Box';

//components

import InputTag from './InputTag';
import ListTags from './ListTags';

const Tag = () => {
  return (
    <Fragment>
      <Box sx={{ m: 2, mx: 'auto', maxWidth: '95%' }}>
        <InputTag />
        <ListTags />
      </Box>
    </Fragment>
  );
};
export default Tag;
