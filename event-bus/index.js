const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

// 전달받은 event를 연결된 서비스 모두에 다시 전달해줍니다
app.post('/events', (req, res) => {
  const event = req.body;

  // 이벤트 전송 실패시 핸들링 기능 추가 필요함
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);

  res.send({ status: 'OK' });
})

app.listen(4005, () => {
  console.log(`bus running on port 4005`);
});