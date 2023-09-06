import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },

  {
    path: "/2",
    element: <Main2 />,
  },
]);

export default router;
