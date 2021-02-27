const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

// memory data storage for all the events sent
const events = [];

// 전달받은 event를 연결된 서비스 모두에 다시 전달해줍니다
app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event)

  // 이벤트 전송 실패시 핸들링 기능 추가 필요함
  axios.post('http://post-clusterip-srv:4000/events', event);
  axios.post('http://comments-srv:4001/events', event);
  axios.post('http://query-srv:4002/events', event);
  axios.post('http://moderation-srv:4003/events', event);ㅇ

  res.send({ status: 'OK' });
})

// 다른 서비스가 다운되었을때, 이벤트 버스에 저장된 이벤트를 불러와 데이터 sync작업 실행
app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log(`bus running on port 4005`);
});