import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { FaFlag } from 'react-icons/fa'
import { FaEquals } from 'react-icons/fa'

import CARD from './CARD'

const Results = () => {
  document.title="Poll Pit | Results"
  const socket = useMemo(() => io.connect(import.meta.env.VITE_SERVER_URL), [])
  const navigate = useNavigate()
  const [polls, setPolls] = useState([])

  const { isAuthenticated } = useContext(UserContext)
  const user = localStorage.getItem('user')
  useEffect(() => {
    if (isAuthenticated || user) {
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    socket.emit('getAllPolls', {})
    socket.on('received_polls', async data => {
      setPolls(data.polls)
    })
  }, [setPolls, socket])

  return (
    <div className='h-full w-full px-16 bg-gray-100 py-12'>
      <h2 className='xl:text-4xl md:text-2xl text-3xl font-bold px-6 py-2 '>
        Let's See Results{' '}
      </h2>
      {polls?.map((poll, i) => {
        return (
          <div className='grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-y-4  w-full  '>
            <div key={i} className='my-2'>
              <CARD poll={poll} />
            </div>
            <div className='w-full items-center flex justify-center'>
              {poll.count1 == poll.count2 ? (
                <>
                  <p>
                    <span>
                      <FaEquals />
                    </span>
                  </p>
                </>
              ) : (
                <>
                  {poll.count1 > poll.count2 ? (
                    <>
                      <p className='flex items-center justify-center gap-x-4'>
                        <span className='capitalize text-xl'>
                          {poll.option1}
                        </span>{' '}
                        <span>
                          <FaFlag className='text-indigo-600 h-8 w-8' />
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className='flex items-center justify-center gap-x-4  '>
                        <span className='capitalize  text-xl'>
                          {poll.option2}
                        </span>{' '}
                        <span>
                          <FaFlag className='text-indigo-600 h-8 w-8' />
                        </span>
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Results
