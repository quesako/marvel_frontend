import './styles/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";

function App() {
  return (
      <Router>
        <TopBar
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
  );
}

export default App;
