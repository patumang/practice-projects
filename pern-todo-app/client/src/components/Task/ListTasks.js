import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

import { yellow } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    secondary: {
      main: yellow[600],
    },
  },
});

const columns = [
  { id: 'task_title', label: 'Task Title', minWidth: 500 },
  { id: 'edit', label: 'Edit', minWidth: 50 },
  { id: 'view', label: 'View', minWidth: 50 },
];

const ListTasks = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box sx={{ mt: 1, mx: 'auto', maxWidth: '95%' }}>
          <Grid container spacing={2} alignItems='flex-end' sx={{ my: 3 }}>
            <Grid item xs={8} md={10}>
              <FormControl fullWidth variant='standard'>
                <TextField
                  id='keywordSearch'
                  label='Search'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant='standard'
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2}>
              <FormControl fullWidth size='small'>
                <Select
                  id='searchCategory'
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <MenuItem value={'all'}>All</MenuItem>
                  <MenuItem value={'title'}>Title</MenuItem>
                  <MenuItem value={'description'}>Description</MenuItem>
                  <MenuItem value={'tag'}>Tag</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1, mx: 'auto', maxWidth: '95%' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={task.task_id}
                      >
                        <TableCell>{task.task_title}</TableCell>
                        <TableCell>
                          <Link to={`/tasks/${task.task_id}/update`}>
                            <Button variant='contained' color='secondary'>
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/tasks/${task.task_id}`}>
                            <Button variant='contained'>View</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component='div'
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default ListTasks;
