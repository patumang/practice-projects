import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//components

import SharedLayout from './components/SharedLayout';
import Home from './components/Home';
import Tag from './components/Tag/Tag';
import ListTasks from './components/Task/ListTasks';
import ViewTask from './components/Task/ViewTask';
import EditTask from './components/Task/EditTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='tasks' element={<ListTasks />} />
          <Route path='tasks/:id' element={<ViewTask />} />
          <Route path='tasks/:id/update' element={<EditTask />} />
          <Route path='tags' element={<Tag />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
