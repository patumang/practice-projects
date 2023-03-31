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

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Pern Tasks List</h1>
      <form className='mt-5' onSubmit={onSubmitForm}>
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
        <button className='btn btn-success'>Add</button>
      </form>
    </Fragment>
  );
};

export default InputTask;
