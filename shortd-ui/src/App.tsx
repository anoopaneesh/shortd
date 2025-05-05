import { useAppData } from "./context/AppContext"
import { BrowserRouter, Route,Routes, useNavigate,  } from "react-router"
import SignIn from "./pages/SignIn"
import { useEffect } from "react"
import { ROUTES } from "./common/constant"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
 
function App() { 
  return <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Analytics} element={<Analytics />} />
      <Route path={ROUTES.SignIn} element={<SignIn />} />
      <Route path={ROUTES.Dashboard} element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App
