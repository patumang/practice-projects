import { Fragment } from 'react';

const ViewTask = ({ task }) => {
  return (
    <Fragment>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target={`#id-view-${task.task_id}`}
      >
        View
      </button>

      <div className='modal' id={`id-view-${task.task_id}`}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>View Task</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
              ></button>
            </div>

            <div className='modal-body'>
              <p>{task.task_title}</p>
              <p>{task.task_description}</p>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
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

export default ViewTask;
