import { Fragment, useState, useEffect } from 'react';

const InputTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { taskTitle, taskDescription, selectedTags };
      const response = await fetch('http://localhost:3000/tasks', {
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
        <button className='btn btn-success mt-2'>Add</button>
      </form>
    </Fragment>
  );
};

export default InputTask;
