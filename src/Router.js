import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import History from "./pages/History";
import BuyTicket from "./pages/BuyTicket";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<History />} />
      <Route path="/ticket" element={<BuyTicket />} />
    </Routes>
  )
}

export default router;
