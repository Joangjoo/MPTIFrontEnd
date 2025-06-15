import AboutView from "./about/AboutView";
import HomeView from "./home/HomeView";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
      </Routes>
    </Router>
  );
}

export default App;
