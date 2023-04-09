import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewTask = () => {
  const { id } = useParams();

  const [task, setTask] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);

  const getTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`);
      const jsonData = await response.json();

      setTask(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSelectedTags = async () => {
    try {
      const response = await fetch(`http://localhost:3000/task_tags/${id}`);
      const jsonData = await response.json();
      setSelectedTags(jsonData.map(({ tag_title }) => tag_title));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTask();
    getSelectedTags();
  }, []);
  return (
    <Fragment>
      <p>{task && task.task_title}</p>
      <br />
      <p>{selectedTags && selectedTags.toString()}</p>
      <br />
      <p>{task && task.task_description}</p>
    </Fragment>
  );
};

export default ViewTask;
