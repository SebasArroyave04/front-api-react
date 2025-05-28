import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Torneos from "./pages/Torneos";
import Videojuegos from "./pages/Videojuegos";
import Jugadores from "./pages/Jugadores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="torneo" element={<Torneos />} />
          <Route path="videojuegos" element={<Videojuegos />} />
          <Route path="Jugadores" element={<Jugadores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;