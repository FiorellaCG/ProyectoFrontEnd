import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Admin from '../pages/Admin';
import Comentarios from '../pages/Comentarios';
import Condimentos from '../pages/Condimentos';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Recetas from '../pages/Recetas';
import Register from '../pages/Register';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

function Routing() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/condimentos" element={<Condimentos />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/registro" element={<Register />} />

        {/*<Route path="/admin" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />*/}
      </Routes>
      <Footer />
    </Router>
  );
}

export default Routing