require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a task

app.post('/tasks', async (req, res) => {
  try {
    const { taskTitle, taskDescription, tagId, fusId } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (task_title, task_description, task_created_date) VALUES($1, $2, CURRENT_TIMESTAMP) returning *',
      [taskTitle, taskDescription]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all tasks

app.get('/tasks', async (req, res) => {
  try {
    const allTasks = await pool.query('SELECT * FROM tasks');
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a task

app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [
      id,
    ]);

    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a task

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { taskTitle, taskDescription } = req.body;
    const updateTask = await pool.query(
      'UPDATE tasks SET task_title = $1, task_description = $2 WHERE task_id = $3',
      [taskTitle, taskDescription, id]
    );

    res.json('Task was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
