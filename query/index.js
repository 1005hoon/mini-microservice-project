const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.post('/events', (req, res) => {
 const { type, data } = req.body;

 if (type === 'PostCreated') {
   const { id, title } = data;
   
   posts[id] = { id, title, comments: [] };
 };

 if (type === 'CommentCreated') {
  const { id, content, postId, status } = data;
  const post = posts[postId];
  
  post.comments.push({ id, content, status });
 }

 //  디버깅 목적의 콘솔
 console.log(posts)
 res.send({})
})

// 다른 서비스에서 포스트 데이터 요청시, 포스트와 연결된 코멘트 모두 제공
app.get('/posts', (req, res) => {
  res.send(posts)
});

app.listen(4002, () => {
  console.log('query running on port 4002');
});