import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [ posts, setPosts ] = useState({});

  const getPosts = async() => {
    // query 서비스에 데이터를 받아오도록 요청
    const { data } = await axios.get('http://localhost:4002/posts');
    
    setPosts({ ... posts, ...data });
  }

  useEffect(() => {
    getPosts();
  }, [])

  const renderedPosts = Object.values(posts).map(({ id, title, comments }) => (
    <div 
      className="card"
      style={{ width: '30%', marginBottom: '20px' }}  
      key={id}
    >
      <div className="card-body">
        <h3>{title}</h3>
        <CommentList comments={comments}/>
        <CommentCreate postId={id} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
