import { Fragment, useState } from 'react';

const InputTag = () => {
  const [tagTitle, setTagTitle] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { tagTitle };
      const response = await fetch('http://localhost:3000/tags', {
        method: 'POST',
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
      <form className='mt-4 d-flex' onSubmit={onSubmitForm}>
        <div className='form-group mt-2'>
          <input
            type='text'
            className='form-control'
            id='tagTitle'
            placeholder='add new Tag Title'
            value={tagTitle}
            onChange={(e) => setTagTitle(e.target.value)}
          />
        </div>
        <button className='btn btn-success mt-2'>Add</button>
      </form>
    </Fragment>
  );
};

export default InputTag;
