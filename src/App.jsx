import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route, Navigate,
} from 'react-router-dom';
import HomeScreen from "./features/home/home_screen.jsx";
import AboutScreen from "./features/about/about_screen.jsx";
import SummarisationScreen from "./features/summarisation/summarisation_screen.jsx";
import KnowledgeGraphScreen from "./features/knowledge_graph/knowledge_graph_screen.jsx";

// This component is used to render the correct page based on the URL
const Routing = () => {
  return <Routes>
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/about" element={ <AboutScreen /> } />
    <Route path="/summarisation" element={ <SummarisationScreen /> } />
    <Route path="/knowledge-graph" element={ <KnowledgeGraphScreen /> } />
    <Route path="*" element={ <Navigate to={'/home'} /> } />
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
