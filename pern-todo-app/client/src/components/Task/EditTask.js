import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const getTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`);
      const jsonData = await response.json();
      setTaskTitle(jsonData.task_title);
      setTaskDescription(jsonData.task_description);
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
      setSelectedTags(jsonData.map(({ tag_id }) => tag_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTask();
    getTags();
    getSelectedTags();
  }, []);

  //edit Task function
  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const body = { taskTitle, taskDescription, selectedTags };
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
      <div className='form-group'>
        <label htmlFor='taskTitle'>Title</label>
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
          value={selectedTags}
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
      <div className='form-group'>
        <label htmlFor='taskDescription'>Description</label>
        <textarea
          type='text'
          className='form-control'
          id='taskDescription'
          placeholder='Description'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          rows='10'
        ></textarea>
      </div>

      <button
        type='button'
        className='btn btn-warning'
        onClick={(e) => updateTask(e)}
      >
        Update
      </button>
    </Fragment>
  );
};

export default EditTask;
