
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import NotFound from "./components/NotFound";
import GalleryAlcohols from './components/GalleryAlcohols';
import GalleryCocktails from './components/GalleryCocktails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/alcohols" element={<GalleryAlcohols/>} />
        <Route path="/cocktails" element={<GalleryCocktails />} />
        {/* <Route path="/cocktails/:slug" element={<CocktailDetail />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
