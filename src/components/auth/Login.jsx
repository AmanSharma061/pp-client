import { axiosInstance } from '../../api/axios_config.js'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { userDetails, setUserDetails, setIsAuthenticated } =
    useContext(UserContext)
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: ''
  })
  const handler = async e => {
    e.preventDefault()
    const res = await axiosInstance.post('/api/login', {
      ...data
    })
    const details = res?.data
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(details?.user))
    setUserDetails(details?.user)

    toast.success('Logged in successfully', {
      autocomplete: 800
    })
    navigate('/')
  }

  const changeHandler = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <section class='bg-gray-50 dark:bg-gray-900'>
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div class='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your Account
            </h1>
            <form class='space-y-4 md:space-y-6' onSubmit={handler}>
              <div>
                <label
                  for='email'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={e => changeHandler(e)}
                  id='email'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  value={data.password}
                  onChange={e => changeHandler(e)}
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>

              <button
                type='submit'
                class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-purple-600'
              >
                Sign in
              </button>
              <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don't have an account?{' '}
                <Link
                  to='/signup'
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
