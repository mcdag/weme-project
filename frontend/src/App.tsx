import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Register from "./views/Register";
import Credentials from "./views/Credentials";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/auth/login",
      element: <Login/>
    },
    {
      path: "/auth/register",
      element: <Register/>
    },
    {
      path: "/credentials",
      element: <Credentials/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;