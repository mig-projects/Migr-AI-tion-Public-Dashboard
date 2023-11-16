import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route, Navigate,
} from 'react-router-dom';

// This component is used to render the correct page based on the URL
const Routing = () => {
  return <Routes>

  </Routes>;
}

function App() {
  return <div id="App">
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </div>;
}

export default App;
