import { Fragment, useState } from 'react';

const EditTask = ({ task }) => {
  const [taskTitle, setTaskTitle] = useState(task.task_title);
  const [taskDescription, setTaskDescription] = useState(task.task_description);

  //edit Task function

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const body = { taskTitle, taskDescription };
      console.log(body);
      const response = await fetch(
        `http://localhost:3000/tasks/${task.task_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      window.location = '/tasks';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type='button'
        className='btn btn-warning'
        data-bs-toggle='modal'
        data-bs-target={`#id${task.task_id}`}
      >
        Edit
      </button>

      <div
        className='modal'
        id={`id${task.task_id}`}
        onClick={() => {
          setTaskTitle(task.task_title);
          setTaskDescription(task.task_description);
        }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit Task</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                onClick={() => {
                  setTaskTitle(task.task_title);
                  setTaskDescription(task.task_description);
                }}
              ></button>
            </div>

            <div className='modal-body'>
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
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-warning'
                data-bs-dismiss='modal'
                onClick={(e) => updateTask(e)}
              >
                Update
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={() => {
                  setTaskTitle(task.task_title);
                  setTaskDescription(task.task_description);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTask;
