FROM node:alpine

WORKDIR /app

# cra 패키지가 크니까, 패키지는 루트에 꺼내놓고 실행
COPY package.json ./
RUN npm install

# 변경사항이 있는 경우, 패키지가 바뀌는게 아니라면 npm i 다시 실행 안함
COPY ./ ./

CMD ["npm", "start"]