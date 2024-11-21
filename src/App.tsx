import Home from "./views/Home"
import { GlobalProvider } from "./context/ContextProvider"

function App() {
    return (
        <GlobalProvider>
            <Home />
        </GlobalProvider>
    )
}

export default App
