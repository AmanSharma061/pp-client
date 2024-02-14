import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/axios_config'

export default function Signup () {
  const navigate = useNavigate()
  const [isDisabled, setIsdisabled] = useState(true)
  const [uploadDisabled, setUploadDisabled] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  })

  const handleImageChange = e => {
    const file = e.target.files[0]
    setImage(file)
  }

  const uploadImage = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'profile')

    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/djvu6qgds/image/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()
      if (data.secure_url) {
        setImageUrl(data.secure_url)
        setUploadDisabled(true)
        setIsdisabled(false)
      } else {
        console.error('Upload failed:', data.error)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const handler = async e => {
    e.preventDefault()

    try {
      // Update the data object with the image URL
      const userData = { ...data, image: imageUrl }

      if (
        !data.name ||
        !data.email ||
        !imageUrl ||
        !data.password ||
        !data.cpassword
      ) {
        console.log(data.name)
        toast.error('Missing Fields')
        return
      }
      const res = await axiosInstance.post('/api/signup', userData)

      if (res?.data?.error) {
        toast.error(res?.data?.error)
        return
      }
      if (res?.data?.message) {
        toast.success(res?.data?.message)
      }

      navigate('/login')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const changeHandler = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Create an account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handler}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={data.name}
                  onChange={changeHandler}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='John Doe'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={changeHandler}
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  value={data.password}
                  onChange={changeHandler}
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Confirm password
                </label>
                <input
                  type='confirm-password'
                  name='cpassword'
                  value={data.cpassword}
                  onChange={changeHandler}
                  id='cpassword'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='image'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Profile Image
                </label>
                <input
                  type='file'
                  onChange={handleImageChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
                <p
                  disabled={uploadDisabled}
                  onClick={() => uploadImage()}
                  className={`px-4 py-2 my-1 ${
                    uploadDisabled ? 'bg-indigo-400' : 'bg-indigo-600'
                  } rounded-lg items-center justify-center flex text-white cursor-pointer `}
                >
                  Upload
                </p>
              </div>
              <button
                disabled={isDisabled}
                type='submit'
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  ${
                  isDisabled ? 'bg-purple-400' : 'bg-purple-600'
                }`}
              >
                Create an account
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
