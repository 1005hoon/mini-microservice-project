const express = require('express');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// 연습 목적으로 데이터를 앱 메모리에 보관합니다
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  // 고유 id 생성
  const commentId = randomBytes(8).toString('hex');
  const { content } = req.body;

  // post id에 해당되는 커멘트가 있는지 체크
  const comments = commentsByPostId[req.params.id] || [];

  // 메모리에 포스트 저장
  comments.push({ 
    id: commentId, 
    status: 'pending',
    content
  });
  commentsByPostId[req.params.id] = comments;

  // 이벤트 브로커에 이벤트 전송
  await await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: { 
      id: commentId,
      postId: req.params.id,
      status: 'pending',
      content
     }
  });

  res.status(201).send(comments);
});


// 이벤트 버스로부터 받는 모든 이벤트 처리
app.post('/events', async (req, res) => {
  console.log(`event received: ${req.body.type}`);

  const { type, data } = req.body;

  // 만약 댓글 상태가 업데이트 된다면 아래의 로직을 처리해라
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => comment.id === id);
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommmentUpdated',
      data: {
        id, 
        status,
        postId,
        content
      }
    })
  }

  res.send({});
})

app.listen(4001, () => {
  console.log(`Listening on port 4001`);
});