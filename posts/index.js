const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

// 연습 목적으로 데이터를 앱 메모리에 보관합니다
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  // 고유 id 생성
  const id = randomBytes(8).toString('hex');
  const { title } = req.body;

  // 메모리에 포스트 저장
  posts[id] = { id, title }

  // 이벤트 브로커에 이벤트 전송
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title }
  })

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});