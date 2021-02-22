import React, { useState } from 'react';
import axios from 'axios';

export default function CommentCreate({ postId }) {
  const [ content, setContent ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postid}/comments`, { content });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>댓글 작성하기</label>
          <input 
            type="text" 
            className="form-control"
            onChange={e => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button className="btn btn-primary">등록하기</button>
      </form>
    </div>
  )
};
