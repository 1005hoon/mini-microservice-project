import React from 'react'


export default function CommentList({ comments }) {
  const renderedComments = comments.map(({id, content}) => (
    <li key={id}>{content}</li>
  ))

  return <ul>{renderedComments}</ul>
}
