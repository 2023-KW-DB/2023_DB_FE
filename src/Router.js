import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
// const router = createBrowserRouter([
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/",  
//     element: <Main />,
//   }
// ]);

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  )
}

export default router;
