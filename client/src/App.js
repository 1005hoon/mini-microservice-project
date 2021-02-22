import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default function App() {
  return (
    <div className="container">
      <h1>글 작성하기</h1>
      <PostCreate/>
      <hr/>
      <h1>포스트 보기</h1>
      <PostList/>
    </div>
  )
}
