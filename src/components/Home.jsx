import { useContext, useEffect } from 'react'
import { PollContext } from '../contexts/PollContext'
import { axiosInstance } from '../api/axios_config'
import { Link } from 'react-router-dom'
import CARD from './CARD'

export default function Home () {
  const { allPolls, setAllPolls } = useContext(PollContext)
  /// Not Good Way But just setting the title
  document.title = 'Poll Pit | Home'

  //Getting all the polls
  useEffect(() => {
    const getAllPolls = async () => {
      const polls = await axiosInstance.get('/api/getPolls')
      setAllPolls(polls?.data)
    }
    getAllPolls()
  }, [])

  return (
    <>
      <div className='w-full py-2 h-screen  px-8 max-w-screen-2xl mx-auto '>
        <div className='text-4xl font-bold text-neutral-700 px-2 py-6'>
          <h1>Listed polls</h1>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-2 max-w-screen-2xl mx-auto'>
          {allPolls.length > 0 ? (
            <>
              {allPolls?.map((poll, i) => {
                return <CARD key={i} poll={poll} />
              })}
            </>
          ) : (
            <>
              <div className='px-2 flex flex-col gap-y-2'>
                <h1 className='text-xl font-semibold text-neutral-700'>
                  Nobody Created any poll
                </h1>
                <Link
                  to={'create'}
                  className='text-medium text-white bg-indigo-700/90 px-4 py-2 rounded-xl w-fit'
                >
                  Be the first
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
