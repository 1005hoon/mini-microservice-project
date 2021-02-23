import React from 'react'


export default function CommentList({ comments }) {
  const renderedComments = comments.map(({id, content, status}) => {
    if (status === 'pending')  {
      content = 'Pending for moderation'
    }

    if (status === 'rejected') {
      content = 'This comment has been rejected'
    }
    console.log(content)
    return <li key={id}>{content}</li>
  })

  return <ul>{renderedComments}</ul>
}
