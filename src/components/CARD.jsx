import React, { useContext, useEffect } from 'react'
import { Button, Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { PollContext } from '../contexts/PollContext'
import { UserContext } from '../contexts/UserContext'
const CARD = ({ poll }) => {
  const { setSinglePoll } = useContext(PollContext)
  const { isAuthenticated } = useContext(UserContext)

  const user = localStorage.getItem('user')
  return (
    <Card className='max-w-md max-h-56 rounded-xl'>
      <h5 className='text-2xl font-bold tracking-tight text-neutral-700 dark:text-white pb-4'>
        {poll?.title}
      </h5>
      <p className='font-normal text-neutral-700 dark:text-gray-400 pb-1'>
        {poll?.description}
      </p>

      <Link
        to={`${isAuthenticated || user ? `/poll/${poll._id}` : '/login'}`}
        className=''
      >
        <Button className='bg-indigo-600 text-white w-fit'>
          Vote Now{' '}
          <svg
            className='-mr-1 ml-2 h-4 w-4'
            fill='white'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </Button>
      </Link>
    </Card>
  )
}

export default CARD
