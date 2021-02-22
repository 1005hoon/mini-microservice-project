const express = require('express');
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

app.post('/posts/:id/comments', (req, res) => {
  // 고유 id 생성
  const commentId = randomBytes(8).toString('hex');
  const { content } = req.body;

  // post id에 해당되는 커멘트가 있는지 체크
  const comments = commentsByPostId[req.params.id] || [];

  // 메모리에 포스트 저장
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log(`Listening on port 4001`);
});