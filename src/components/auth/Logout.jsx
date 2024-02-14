import { axiosInstance } from '../api/axios_config'
import { PollContext } from '../../contexts/PollContext'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { setIsAuthenticated, setUserDetails } = useContext(UserContext)
  const { setSinglePoll } = useContext(PollContext)
  const navigate = useNavigate()
  useEffect(() => {
    const logOut = async () => {
      axiosInstance.post('/api/logout')
      setIsAuthenticated(false)
      setSinglePoll({})

      localStorage.removeItem('user')
      setUserDetails([])
      toast.success('Logged Out Successfully', {
        autoClose: 500
      })
      navigate('/login')
    }
    logOut()
  }, [])
  return (
    <>
      <div></div>
    </>
  )
}

export default Logout
