FROM mhart/alpine-node:latest
ADD package.json .
RUN npm install
ADD index.js .
ENV NODE_ENV production
CMD ["node", "index.js"]
