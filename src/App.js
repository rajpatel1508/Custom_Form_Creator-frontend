import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Homepage from './containers/Homepage';
import Form from './containers/Form';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/forms/:id/link' element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
