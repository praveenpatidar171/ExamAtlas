import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Dashboard from "./components/page/Dashboard"

function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/",
        element: <Dashboard />
      },

    ]
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
