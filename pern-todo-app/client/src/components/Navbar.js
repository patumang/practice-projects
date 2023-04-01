import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav'>
          <Link className='nav-item nav-link active' to='/'>
            Home
          </Link>
          <Link className='nav-item nav-link' to='/tasks'>
            Tasks
          </Link>
          <Link className='nav-item nav-link' to='/tags'>
            Tags
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
