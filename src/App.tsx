import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import PostEditor from "./views/PostEditor";

const router = createHashRouter([
  {
    path: "/",
    element: <PostEditor />,
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
