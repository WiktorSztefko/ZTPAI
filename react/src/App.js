
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import NotFound from "./components/NotFound";
import GalleryAlcohols from './components/GalleryAlcohols';
import GalleryCocktails from './components/GalleryCocktails';
import Cocktail from './components/Cocktail';
import Upload from './components/Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Upload />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/alcohols" element={<GalleryAlcohols/>} />
        <Route path="/cocktails" element={<GalleryCocktails />} />
        <Route path="/cocktails/:slug" element={<Cocktail />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
