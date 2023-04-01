import { Fragment, useEffect, useState } from 'react';

import EditTask from './EditTask';
import ViewTask from './ViewTask';

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const jsonData = await response.json();

      setTasks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks);

  return (
    <Fragment>
      {' '}
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.task_title}</td>
              <td>
                <EditTask task={task} />
              </td>
              <td>
                <ViewTask task={task} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTasks;
