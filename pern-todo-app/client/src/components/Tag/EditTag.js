import { Fragment, useState } from 'react';

const EditTag = ({ tag }) => {
  const [tagTitle, setTagTitle] = useState(tag.tag_title);

  //edit Tag function

  const updateTag = async (e) => {
    e.preventDefault();
    try {
      const body = { tagTitle };
      console.log(body);
      const response = await fetch(`http://localhost:3000/tags/${tag.tag_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/tags';
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
        data-bs-target={`#id${tag.tag_id}`}
      >
        Edit
      </button>

      <div
        className='modal'
        id={`id${tag.tag_id}`}
        onClick={() => setTagTitle(tag.tag_title)}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Edit Tag</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                onClick={() => setTagTitle(tag.tag_title)}
              ></button>
            </div>

            <div className='modal-body'>
              <div className='form-group'>
                <label htmlFor='tagTitle'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  id='tagTitle'
                  placeholder='Title'
                  value={tagTitle}
                  onChange={(e) => setTagTitle(e.target.value)}
                />
              </div>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-warning'
                data-bs-dismiss='modal'
                onClick={(e) => updateTag(e)}
              >
                Update
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={() => setTagTitle(tag.tag_title)}
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

export default EditTag;
