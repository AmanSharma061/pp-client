import { UserContext } from '../contexts/UserContext'
import { Button } from 'flowbite-react'
import { Menu, Search } from 'lucide-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { menus } from '../constants/index'
export default function Navbar () {
  const socket = useMemo(() =>  io.connect(import.meta.env.VITE_SERVER_URL), [])
  const [state, setState] = React.useState(false)
  const { isAuthenticated } = useContext(UserContext)
  const [Notifications, setNotifications] = useState([])

  const userId = JSON.parse(localStorage.getItem('user'))?.id

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  useEffect(() => {
    socket.on('broadcast', data => {
      console.log(data)
      const ln = data.lastNotification
      if (ln?.notificationBy?._id == userId) {
      } else if (ln?.notificationFor?._id == userId) {
        toast.success('A New Comment On Your Poll ', ln?.poll?.name)
      }
    })
  }, [socket])

  return (
    <nav className='bg-white w-full border-b md:border-0'>
      <div className='items-center px-4 max-w-screen-2xl mx-auto md:flex md:px-8'>
        <div className='flex items-center justify-between py-3 md:py-5 md:block'>
          <Link to='/'>
            <h1 className='text-3xl font-bold text-indigo-600'>PollPit</h1>
          </Link>

          <div className='md:hidden flex items-center gap-x-4'>
            <Button className='text-white bg-indigo-600'>
              {isAuthenticated || user ? (
                <>
                  {' '}
                  <Link to={'/logout'}>Sign out</Link>
                </>
              ) : (
                <>
                  {' '}
                  <Link to={'/login'}>Sign in</Link>
                </>
              )}
            </Button>

            <button
              className='text-gray-700 outline-none p-2 rounded-md '
              onClick={() => setState(!state)}
            >
              <Menu className='text-indigo-600 h-10 w-10' />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className='justify-end items-center space-y-4  transition-all md:flex md:space-x-6 md:space-y-0  '>
            {menus.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className={`text-gray-600 text-lg hover:text-indigo-600   ${
                    pathname == item.path ? 'text-indigo-600 font-semibold' : ''
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}

            <Button className='text-white bg-indigo-600 hidden lg:block md:block'>
              {isAuthenticated || user ? (
                <>
                  {' '}
                  <Link to={'/logout'}>Sign out</Link>
                </>
              ) : (
                <>
                  {' '}
                  <Link to={'/login'}>Sign in</Link>
                </>
              )}
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  )
}
