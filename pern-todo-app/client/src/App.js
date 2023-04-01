import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//components

import SharedLayout from './components/SharedLayout';
import Home from './components/Home';
import Tag from './components/Tag/Tag';
import ListTasks from './components/Task/ListTasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='tasks' element={<ListTasks />} />
          <Route path='tags' element={<Tag />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
