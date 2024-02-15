import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import CARD from './CARD'
import { io } from 'socket.io-client'

const Profile = () => {
  document.title="Poll Pit | Profile"
  const socket = useMemo(() =>  io.connect(import.meta.env.VITE_SERVER_URL), [])
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(UserContext)
  const user = localStorage.getItem('user')
  const userDetails = JSON.parse(user)
  const [profileImage, setProfileImage] = useState(null)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [CreatedPolls, setCreatedPolls] = useState([])
  const [VotedPolls, setVotedPolls] = useState([])

  const getPollsBYUser = async () => {
    try {
      socket.emit('getPollsByUser', userDetails)
      socket.on('votedInAndVoteCreated', data => {
        const cPolls = data?.createdPolls
        const vPolls = data?.votedPolls
        setVotedPolls(vPolls)
        setCreatedPolls(cPolls)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated || user) {
      getPollsBYUser()
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className='w-full bg-gray-100  mx-auto pt-8 lg:px-48 px-8 box-border  gap-x-2  h-full'>
      <div className='flex md:items-start  items-center  justify-between '>
        <h1 className='text-4xl font-bold mb-2 md:pt-8 text-neutral-800 md:text-5xl'>
          Your Profile
        </h1>
        <img
            src={userDetails?.image}
            alt='sssss'
            className='md:h-44 md:w-44 h-24 w-24 rounded-full'
          />
          </div>
        <div className=''>
          <div className='mb-4'>
            <div className='flex  items-center  '>
              <label className=''>Name:</label>
              <div className='px-3 py-2  rounded-lg'>{userDetails?.name}</div>
            </div>
            <div className='flex  items-center  '>
              <label className=''>Email:</label>
              <div className='px-3 py-2  rounded-lg'>{userDetails?.email}</div>
            </div>
   
        
        </div>

        <div className='mb-8'>
          <h2 className='text-2xl font-semibold mb-2'>Polls Created</h2>
          <ul className='grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-2 max-w-screen-2xl mx-auto'>
            {
              CreatedPolls?.length > 0 ?(<>
              {CreatedPolls?.map((poll, i) => {
              return (
                <div key={i}>
                  <CARD poll={poll} />
                </div>
              )
            })}</>):(<>
            
            <p>No polls created yet</p></>)
            }
          </ul>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-2'>Polls Voted</h2>
          <ul className='grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-2 max-w-screen-2xl mx-auto'>
            {VotedPolls?.length > 0 ? (
              <>
                {VotedPolls?.map((poll,i) => {
                  return <CARD key={i} poll={poll} />
                })}
              </>
            ) : (
              <>
                <p className='px-1'>Not Yet Voted </p>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
