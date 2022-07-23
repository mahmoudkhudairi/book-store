FROM node:16-alpine
WORKDIR /usr/src
COPY ./client/ ./client/
COPY ./server/ .
RUN cd client && npm install && npm run build
RUN npm ci && npm cache clean --force


EXPOSE 4000

CMD ["node", "index.js"]