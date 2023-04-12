import { Fragment, useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import Button from '@mui/material/Button';

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
      <form className='mt-4' onSubmit={onSubmitForm}>
        <div className='form-group mt-2'>
          <label htmlFor='taskTitle'>Task Title</label>
          <input
            type='text'
            className='form-control'
            id='taskTitle'
            placeholder='Title'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className='form-group mt-2'>
          <label className='form-label select-label'>Tags</label>
          <select
            className='select form-control'
            multiple
            onChange={(e) =>
              setSelectedTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {tags.map((tag) => (
              <option key={tag.tag_id} value={tag.tag_id}>
                {tag.tag_title}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group mt-2'>
          <label htmlFor='taskDescription'>Task Description</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName='wrapper-class'
            editorClassName='editor-class'
            toolbarClassName='toolbar-class'
          />
        </div>
        <Button variant='contained'>Add</Button>
      </form>
      <div
        className='preview'
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </Fragment>
  );
};

export default InputTask;
