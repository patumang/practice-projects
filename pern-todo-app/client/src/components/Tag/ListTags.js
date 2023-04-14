import { Fragment, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';

import EditTag from './EditTag';

const columns = [
  { id: 'edit', label: 'Edit', minWidth: 50 },
  { id: 'tag_title', label: 'Tag Title', minWidth: 500 },
];

const ListTags = () => {
  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tags/?keyword=${searchTag}`
      );
      const jsonData = await response.json();

      setTags(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getTags();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTag]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2} alignItems='flex-end' sx={{ my: 3 }}>
          <Grid item xs={8} md={10}>
            <FormControl fullWidth variant='standard'>
              <TextField
                id='keywordSearch'
                label='Search'
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
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
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}>
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
              {tags
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tag) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={tag.tag_id}
                    >
                      <TableCell>
                        <EditTag tag={tag} />
                      </TableCell>
                      <TableCell>{tag.tag_title}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component='div'
          count={tags.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Fragment>
  );
};

export default ListTags;
