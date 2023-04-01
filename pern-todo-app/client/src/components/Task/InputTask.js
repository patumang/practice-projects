import { Fragment, useState } from 'react';

const InputTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { taskTitle, taskDescription };
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
