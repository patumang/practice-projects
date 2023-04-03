import { Fragment, useEffect, useState } from 'react';

import EditTag from './EditTag';

const ListTags = () => {
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/tags');
      const jsonData = await response.json();

      setTags(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  console.log(tags);

  return (
    <Fragment>
      {' '}
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Tag Title</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.tag_id}>
              <td>{tag.tag_title}</td>
              <td>
                <EditTag tag={tag} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTags;
