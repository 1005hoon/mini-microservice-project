import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';

export default function PostList() {
  const [ posts, setPosts ] = useState({});

  const getPosts = async() => {
    const { data } = await axios.get('http://localhost:4000/posts');
    setPosts({ ... posts, ...data });
  }

  useEffect(() => {
    getPosts();
  }, [])

  const renderedPosts = Object.values(posts).map(({ id, title }) => (
    <div 
      className="card"
      style={{ width: '30%', marginBottom: '20px' }}  
      key={id}
    >
      <div className="card-body">
        <h3>{title}</h3>
        <CommentCreate postId={id}/>
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
