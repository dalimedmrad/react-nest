import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import TwoFactorAuth from './pages/TwoFactorAuth'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/two-factor-auth",
        element: <TwoFactorAuth />
      }
    ]

  }
])




ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster />
    </PersistGate>
  </Provider>,
);
