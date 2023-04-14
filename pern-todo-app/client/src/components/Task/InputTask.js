import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const InputTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const getTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/tags');
      const jsonData = await response.json();

      setTags(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTags();
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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        taskTitle,
        taskDescription: convertedContent,
        selectedTags,
      };
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
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
      <Box
        component='form'
        onSubmit={onSubmitForm}
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
            getOptionLabel={(option) => option.tag_title}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} placeholder='Tags' />
            )}
            onChange={(e, filteredTags) =>
              setSelectedTags(filteredTags.map((tag) => tag.tag_id))
            }
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
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
          Add
        </Button>
      </Box>
      <div
        className='preview'
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </Fragment>
  );
};

export default InputTask;
