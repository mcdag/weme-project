import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./views/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;