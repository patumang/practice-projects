import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { yellow } from '@mui/material/colors';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const theme = createTheme({
  palette: {
    secondary: {
      main: yellow[600],
    },
  },
});

const EditTask = () => {
  const { id } = useParams();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const getTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`);
      const jsonData = await response.json();
      setTaskTitle(jsonData.task_title);
      setEditorState(
        EditorState.createWithContent(
          convertFromHTML(jsonData.task_description)
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/tags');
      const jsonData = await response.json();
      setTags(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSelectedTags = async () => {
    try {
      const response = await fetch(`http://localhost:3000/task_tags/${id}`);
      const jsonData = await response.json();
      setSelectedTags(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTask();
    getTags();
    getSelectedTags();
  }, []);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  //edit Task function
  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const body = {
        taskTitle,
        taskDescription,
        selectedTags: selectedTags.map((tag) => tag.tag_id),
      };
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/tasks';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          component='form'
          onSubmit={updateTask}
          noValidate
          sx={{ mt: 1, mx: 'auto', maxWidth: '95%' }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='taskTitle'
            label='Task Title'
            name='taskTitle'
            autoComplete='email'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
            sx={{ mt: 3 }}
          />
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Autocomplete
              multiple
              id='tags-outlined'
              options={tags}
              value={selectedTags}
              getOptionLabel={(option) => option.tag_title}
              isOptionEqualToValue={(option, value) =>
                option.tag_id === value.tag_id
              }
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder='Tags' />
              )}
              onChange={(e, filteredTags) => setSelectedTags(filteredTags)}
            />
          </Stack>
          <FormGroup sx={{ mt: 3 }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName='wrapper-class'
              editorClassName='editor-class'
              toolbarClassName='toolbar-class'
            />
          </FormGroup>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            sx={{ mt: 3 }}
          >
            Update
          </Button>
        </Box>
        <div
          className='preview'
          dangerouslySetInnerHTML={createMarkup(convertedContent)}
        ></div>
      </ThemeProvider>
    </Fragment>
  );
};

export default EditTask;
