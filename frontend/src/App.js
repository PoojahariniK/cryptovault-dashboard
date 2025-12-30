import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Assets from "./pages/Assets";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/assets" element={<Assets/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
