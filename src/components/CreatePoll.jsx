import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { axiosInstance } from '../api/axios_config'
const CreatePoll = () => {
  document.title="Poll Pit | Create"
  const navigate = useNavigate()
  const { userDetails, setUserDetails, setIsAuthenticated, isAuthenticated } =
    useContext(UserContext)

  const [data, setData] = useState({
    title: '',
    description: ''
  })
  const [options, setOptions] = useState({
    option1: '',
    option2: ''
  })
  const handler = async e => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem('user'))

    const response = await axiosInstance.post('/api/create', { user, options, data })
    const res = response.data

    toast.success(res.message, {
      autoComplete: 500
    })
    navigate('/')
  }

  const changeHandler = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  const optionChangeHandler = event => {
    setOptions({ ...options, [event.target.name]: event.target.value })
  }
  const user = localStorage.getItem('user')
  useEffect(() => {
    if (isAuthenticated || user) {
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className='w-full flex h-full bg-gray-100 '>
      {' '}
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full'>
        <div class='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Create Poll
            </h1>
            <form class='space-y-4 md:space-y-6' onSubmit={handler}>
              <div>
                <label
                  for='email'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Poll Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={data.title}
                  onChange={e => changeHandler(e)}
                  id='email'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Who will win Elections'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Poll Description
                </label>
                <input
                  type='text'
                  value={data.description}
                  onChange={e => changeHandler(e)}
                  name='description'
                  id='password'
                  placeholder='Share your views on the upcoming elections'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Option 1
                </label>
                <input
                  type='text'
                  value={options.option1}
                  onChange={e => optionChangeHandler(e)}
                  name='option1'
                  id='password'
                  placeholder='e.g "yes"'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Option 2
                </label>
                <input
                  type='text'
                  value={options.option2}
                  onChange={e => optionChangeHandler(e)}
                  name='option2'
                  id='password'
                  placeholder='e.g "no"'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <button
                type='submit'
                class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-purple-600'
              >
                Create Poll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePoll
