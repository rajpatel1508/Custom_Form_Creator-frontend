import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FormList from './containers/homepage/Homepage';
import FormResponsePage from './containers/form/Form';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormList />} />
        <Route path='/forms/link/:id' element={<FormResponsePage />} />
      </Routes>
    </Router>
  );
}

export default App;
