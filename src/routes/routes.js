import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import NotFound from "../Components/NotFound";
import UpdateProfile from "../Components/UpdateProfile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      // { path: "/about", element: <About></About> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/update", element: <UpdateProfile /> },
      { path: "*", element: <NotFound></NotFound> },
    ],
  },
]);

export default routes;
