import { createContext, useState } from 'react'

export const PollContext = createContext()
export const PollContextProvider = ({ children }) => {
  const [allPolls, setAllPolls] = useState([])
  const [singlePoll, setSinglePoll] = useState({})
  return (
    <PollContext.Provider
      value={{ allPolls, setAllPolls, singlePoll, setSinglePoll }}
    >
      {children}
    </PollContext.Provider>
  )
}
