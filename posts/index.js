const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json())
// 연습 목적으로 데이터를 앱 메모리에 보관합니다
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  // 고유 id 생성
  const id = randomBytes(8).toString('hex');
  const { title } = req.body;

  // 메모리에 포스트 저장
  posts[id] = { id, title }

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});