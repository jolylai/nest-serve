FROM node:16-alpine
WORKDIR /app
COPY package.json /app/
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn
COPY . /app
RUN yarn prisma:generate
RUN yarn build
EXPOSE 7070
CMD ["node", "/app/dist/main.js"]