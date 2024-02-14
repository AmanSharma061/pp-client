import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Label, Radio } from 'flowbite-react'
import { PollContext } from '../contexts/PollContext'
import axios from 'axios'
import toast from 'react-hot-toast'

import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import CommentCard from './comments/CommentCard'

const SinglePoll = () => {
  const [selectedValue, setSelectedValue] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const { singlePoll, setSinglePoll } = useContext(PollContext)
  const socket = useMemo(() => io.connect('http://localhost:3000'), [])
  const user = JSON.parse(localStorage.getItem('user'))
  const pathname = useParams()
  const pollId = pathname.id
  const userId = user.id
  const createrId=singlePoll?.creater?._id;

  const handleRadioChange = event => {
    setSelectedValue(event.target.value)
  }

  const SubmitHandler = async e => {
    e.preventDefault()
    const details = {
      userId,
      pollId,
      selectedValue,
    }
    socket.emit('voting', details)
    socket.on('message', data => {
      if (data.error) {
        setIsDisabled(true)
        toast.error(data.error, {
          autoClose: 300
        })
      } else {
        toast.success(data.message)
      }
    })
  }

  const getSingleById = async () => {
    const res = await axios.post('/api/getSingle', { pollId })

    setSinglePoll(res.data)
  }

  useEffect(() => {
    getSingleById()
  }, [pollId, socket])

  useEffect(() => {
    socket.on('receive_comment', async data => {
      setComments(data.comments)
    })
  }, [socket, setComments, pollId])
  const formhandler = async e => {
    e.preventDefault()
    socket.emit('post_comment', {
      pollId,
      comment,
      userId,
      createrId
    })
    setComment('')
  }
  useEffect(() => {
    socket.emit('poll_comments', { pollId })
    socket.on('initial_pollComments', data => {
      setComments(data.pollComments)
    })
  }, [])






  return (
    <div className='min-h-100  flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-2xl font-extrabold text-gray-900'>
          {singlePoll.title}
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          {singlePoll.description}
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={SubmitHandler}>
            <div className='flex items-center gap-x-2'>
              <div className='mt-1'>
                <input
                  type='radio'
                  name='options'
                  id='option1'
                  disabled={isDisabled}
                  value={singlePoll.option1}
                  checked={selectedValue === singlePoll.option1}
                  onChange={handleRadioChange}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                />
              </div>
              <label
                htmlFor='option1'
                className='block text-sm font-medium text-gray-700'
              >
                <p>{singlePoll.option1}</p>
              </label>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='mt-1'>
                <input
                  type='radio'
                  name='options'
                  id='option2'
                  disabled={isDisabled}
                  value={singlePoll.option2}
                  checked={selectedValue === singlePoll.option2}
                  onChange={handleRadioChange}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 '
                />
              </div>
              <label
                htmlFor='option2'
                className='text-sm font-medium text-gray-700 flex gap-x-2'
              >
                <p>{singlePoll.option2}</p>
              </label>
            </div>

            <div className='flex items-center justify-center'>
              <button
                disabled={isDisabled}
                type='submit'
                className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isDisabled ? 'bg-indigo-400' : 'bg-indigo-600 '
                } ${
                  isDisabled ? '' : 'hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Submit Response
              </button>
            </div>
          </form>
        </div>
        <div className='py-4'>
          <h1 className='text-xl font-semibold'>Commet Section</h1>

          <form onSubmit={formhandler} className='flex gap-x-2 py-4'>
            <input
              type='text'
              className='py-2 px-2 bg-gray-200 text-black rounded-xl'
              value={comment}
              placeholder='Comment here....'
              onChange={e => setComment(e.target.value)}
            />
            <button className='px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl'>
              Submit
            </button>
          </form>

          {comments?.map((comment, i) => {
            return (
              <div className='flex gap-x-4 ' key={i}>
                <CommentCard user={user} comment={comment} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SinglePoll
