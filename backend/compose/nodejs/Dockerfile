FROM node:10-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json

RUN npm install
RUN npm install -g

COPY ./compose/nodejs/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh

EXPOSE 3000

ENV PATH=$PATH:/app/node_modules/.bin
ENTRYPOINT ["/start.sh"]
