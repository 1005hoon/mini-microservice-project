import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function CommentList({ postId }) {
  const [ comments, setComments ] = useState([]);

  const getComments = async () => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

  const renderedComments = comments.map(({id, content}) => (
    <li key={id}>{content}</li>
  ))

  return <ul>{renderedComments}</ul>
}
