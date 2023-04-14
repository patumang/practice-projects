import { Fragment, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: yellow[600],
    },
  },
});

const EditTag = ({ tag }) => {
  const [tagTitle, setTagTitle] = useState(tag.tag_title);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleClickOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  //edit Tag function

  const updateTag = async (e) => {
    e.preventDefault();
    try {
      const body = { tagTitle };
      const response = await fetch(`http://localhost:3000/tags/${tag.tag_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      handleCloseEditDialog();
      window.location.reload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <div>
          <Button
            data-id={tag.tag_id}
            variant='contained'
            color='secondary'
            onClick={handleClickOpenEditDialog}
          >
            Edit
          </Button>
          <Dialog
            fullWidth
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            aria-labelledby='edit-dialog-title'
          >
            <DialogTitle id='edit-dialog-title'>Edit Tag</DialogTitle>
            <DialogContent>
              <TextField
                margin='dense'
                required
                fullWidth
                id='tagTitle'
                label='Tag Title'
                name='tagTitle'
                value={tagTitle}
                onChange={(e) => setTagTitle(e.target.value)}
                autoFocus
                sx={{ mt: 3 }}
                variant='standard'
              />
            </DialogContent>
            <DialogActions>
              <Button
                data-id={tag.tag_id}
                variant='contained'
                color='secondary'
                onClick={(e) => updateTag(e)}
              >
                Update
              </Button>
              <Button onClick={handleCloseEditDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default EditTag;
