import { createHashRouter, RouterProvider } from "react-router-dom"

import PostEditor from "./views/PostEditor"
import { GlobalProvider } from "./context/ContextProvider"

const router = createHashRouter([
    {
        path: "/",
        element: <PostEditor />,
    },
])

function App() {
    return (
        <GlobalProvider>
            <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </GlobalProvider>
    )
}

export default App
