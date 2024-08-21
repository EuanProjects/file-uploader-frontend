import App from "./App";
import Login from "./pages/login/login";
import ErrorPage from "./pages/errorPage/errorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
