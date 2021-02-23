const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};
const handleEvent = ({type, data}) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    
    posts[id] = { id, title, comments: [] };
  };
 
  if (type === 'CommentCreated') {
   const { id, content, postId, status } = data;
   const post = posts[postId];
   
   post.comments.push({ id, content, status });
  }
 
  if (type === 'CommmentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content;   
  }
}

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  //  디버깅 목적의 콘솔
  res.send({})
})

// 다른 서비스에서 포스트 데이터 요청시, 포스트와 연결된 코멘트 모두 제공
app.get('/posts', (req, res) => {
  res.send(posts)
});

app.listen(4002, async () => {
  console.log('synchronizing data with eventbus');

  const res = await axios.get('http://localhost:4005/events')

  for (let event of res.data){
    console.log(Procoessing event)
  }

});