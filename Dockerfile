FROM node:14-alpine
WORKDIR /app
ADD package.json /app/
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn
ADD . /app
RUN npm run build
EXPOSE 3000
CMD [ "node", 'dist/main.js' ]