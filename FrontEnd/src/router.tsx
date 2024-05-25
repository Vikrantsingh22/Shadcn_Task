import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Home";
import Component, { Dashboard1 } from "./components/Form";

import Edit from "./components/Edit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/add",
    element: <Dashboard1 />,
  },

  {
    path: "/edit",
    element: <Edit />,
  },
]);
