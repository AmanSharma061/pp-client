import moment from 'moment'
import React from 'react'

const CommentCard = ({ user, comment }) => {
  return (
    <div class='w-full mx-10 bg-white shadow-lg rounded-lg gap-y-4 mb-4 overflow-hidden'>
      <div class='flex items-center p-4 '>
        <img
          class='h-8 w-8 rounded-full mr-2 object-cover'
          src={comment?.postedBy?.image}
          alt='User Avatar'
        />
        <div>
          <p class='text-sm font-semibold text-gray-900'>
            {comment?.postedBy?.name}
          </p>
          <p class='text-xs text-gray-600'>{moment(Date()).calendar()}</p>
        </div>
      </div>
      <div class='px-4 py-2'>
        <p class='text-sm text-gray-700'>{comment.content}</p>
      </div>
    </div>
  )
}

export default CommentCard
