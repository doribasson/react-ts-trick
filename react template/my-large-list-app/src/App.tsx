import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LargeListPage from '@/pages/LargeListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LargeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;