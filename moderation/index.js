const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

// event bus에서 받은 데이터를 moderate 해주는 로직
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log(type, data)
  // comment가 생성된 케이스라면
  if (type === 'CommentCreated') {
    // orange라는 단어가 포함되어있는지 확인하고
    const status =  data.content.includes('orange') ? 'rejected' : 'approved';
  
    // 상태를 다시 이벤트 버스로 발송!
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status
      }
    })
  }
  res.send({});
})

app.listen(4003, () => {
  console.log('moderation running on port 4003');
})
