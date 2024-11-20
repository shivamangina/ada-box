import { createHashRouter, RouterProvider } from "react-router-dom"

import Home from "./views/Home"
import { GlobalProvider } from "./context/ContextProvider"

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
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
