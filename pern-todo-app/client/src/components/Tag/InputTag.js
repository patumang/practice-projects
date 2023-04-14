import { Fragment, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const InputTag = () => {
  const [tagTitle, setTagTitle] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { tagTitle };
      const response = await fetch('http://localhost:3000/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/tags';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Box component='form' onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2} alignItems='center' sx={{ my: 3 }}>
          <Grid item xs={8} md={10}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='tagTitle'
              label='Tag Title'
              name='tagTitle'
              value={tagTitle}
              onChange={(e) => setTagTitle(e.target.value)}
              autoFocus
              sx={{ mt: 3 }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default InputTag;
