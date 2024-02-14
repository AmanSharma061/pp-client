import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  Link,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Home from './components/Home.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import Navbar from './components/Navbar.jsx'
import Layout from './Layout.jsx'
import Polls from './components/Results.jsx'
import CreatePoll from './components/CreatePoll.jsx'
import SinglePoll from './components/SinglePoll.jsx'
import Results from './components/Results.jsx'
import Login from './components/auth/Login'
import { UserContext, UserContextProvider } from './contexts/UserContext'
import {PollContextProvider} from './contexts/PollContext'
import Logout from './components/auth/Logout'
import Signup from './components/auth/Signup'
import Profile from './components/Profile'

const router = createBrowserRouter(
  
  createRoutesFromElements(
    
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/results' element={<Results />} />
      <Route path='/create' element={<CreatePoll />} />
      <Route path='/poll/:id' element={<SinglePoll />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile/>} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <UserContextProvider>
      <PollContextProvider>

      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      </PollContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
