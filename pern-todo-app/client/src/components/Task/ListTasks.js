import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListTasks = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/?keyword=${searchKeyword}&field=${searchField}`
      );
      const jsonData = await response.json();

      setTasks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getTasks();
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchKeyword, searchField]);

  return (
    <Fragment>
      <form className='form-inline'>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='keywordSearch'
            placeholder='Search'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <select
            className='select form-control ml-2'
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option key='all' value='all'>
              All
            </option>
            <option key='title' value='title'>
              Title
            </option>
            <option key='description' value='description'>
              Description
            </option>
            <option key='tag' value='tag'>
              Tag
            </option>
          </select>
        </div>
      </form>
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
                <Link to={`/tasks/${task.task_id}/update`}>Edit</Link>
              </td>
              <td>
                <Link to={`/tasks/${task.task_id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTasks;
