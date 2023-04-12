require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a tag

app.post('/tags', async (req, res) => {
  try {
    const { tagTitle } = req.body;
    const newTag = await pool.query(
      'INSERT INTO tags (tag_title) VALUES($1) returning *',
      [tagTitle]
    );

    res.json(newTag.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a task

app.post('/tasks', async (req, res) => {
  try {
    const { taskTitle, taskDescription, selectedTags } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (task_title, task_description, task_created_date) VALUES($1, $2, CURRENT_TIMESTAMP) returning *',
      [taskTitle, taskDescription]
    );
    for (const tag of selectedTags) {
      const newTaskTag = await pool.query(
        'INSERT INTO tasks_tags (task_id, tag_id) VALUES($1, $2)',
        [newTask.rows[0].task_id, tag]
      );
    }

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all tags

app.get('/tags', async (req, res) => {
  try {
    const allTags = await pool.query('SELECT * FROM tags ORDER BY tag_id DESC');
    res.json(allTags.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all tasks

app.get('/tasks', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const field = req.query.field;
    let query =
      'SELECT tasks.task_id, tasks.task_title, tasks.task_description FROM tasks';
    if (keyword && field === 'tag') {
      query += ` INNER JOIN tasks_tags ON tasks.task_id = tasks_tags.task_id INNER JOIN tags ON tags.tag_id = tasks_tags.tag_id WHERE UPPER(tags.tag_title) LIKE '%${keyword.toUpperCase()}%'`;
    } else if (keyword && field === 'all') {
      query += ` WHERE UPPER(task_title) LIKE '%${keyword
        .toUpperCase()
        .trim()}%' OR UPPER(task_description) LIKE '%${keyword
        .toUpperCase()
        .trim()}%'`;
    } else if (keyword && field === 'title') {
      query += ` WHERE UPPER(task_title) LIKE '%${keyword
        .toUpperCase()
        .trim()}%'`;
    } else if (keyword && field === 'description') {
      query += ` WHERE UPPER(task_description) LIKE '%${keyword
        .toUpperCase()
        .trim()}%'`;
    }
    query += ' ORDER BY tasks.task_id DESC';
    const allTasks = await pool.query(query);
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

//get task tags

app.get('/task_tags/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const taskTags = await pool.query(
      'SELECT tasks_tags.tag_id,tags.tag_title FROM tasks_tags INNER JOIN tasks ON tasks.task_id = tasks_tags.task_id INNER JOIN tags ON tags.tag_id = tasks_tags.tag_id WHERE tasks.task_id = $1 AND tasks_tags.selected = true',
      [id]
    );
    res.json(taskTags.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a tag

app.put('/tags/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { tagTitle } = req.body;
    const updateTag = await pool.query(
      'UPDATE tags SET tag_title = $1 WHERE tag_id = $2',
      [tagTitle, id]
    );

    res.json('Tag was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//update a task

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { taskTitle, taskDescription, selectedTags } = req.body;
    const selectedTagsInt = selectedTags.map((tag) => parseInt(tag));
    const updateTask = await pool.query(
      'UPDATE tasks SET task_title = $1, task_description = $2 WHERE task_id = $3',
      [taskTitle, taskDescription, id]
    );

    if (selectedTags.length > 0) {
      const deSelectTaskTags = await pool.query(
        'UPDATE tasks_tags SET selected = false WHERE task_id = $1 AND tag_id NOT IN (' +
          selectedTags.toString() +
          ')',
        [id]
      );
      const selectTaskTags = await pool.query(
        'UPDATE tasks_tags SET selected = true WHERE task_id = $1 AND tag_id IN (' +
          selectedTags.toString() +
          ')',
        [id]
      );

      for (const tag of selectedTags) {
        const insertTaskTags = await pool.query(
          'INSERT INTO tasks_tags (task_id, tag_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM tasks_tags WHERE task_id = $1 AND tag_id = $2)',
          [id, tag]
        );
      }
    }

    res.json('Task was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
