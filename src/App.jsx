import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEvents from "./pages/listEvents";
import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRouter from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/evento" element={
            <ProtectedRouter>
              <ListEvents/>
            </ProtectedRouter>
          }/>
          <Route path="/users" element={
          <ProtectedRouter>
            <ListUsers/>
          </ProtectedRouter> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
