import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      // { path: "/about", element: <About></About> },
      // { path: "/login", element: <Login /> },
      // { path: "/signup", element: <Signup /> },
      // { path: "*", element: <NotFound></NotFound> },
    ],
  },
]);

export default routes;