FROM node:10.16-alpine
LABEL maintainer="shamanth.gs@gmail.com"

RUN apk update && \
    apk upgrade && \
    apk add bash jq unzip py-pip zip git curl wget make

ADD CurrencyExchangeRate /opt/app/tmp
WORKDIR /opt/app
RUN cd tmp && \
    npm install && \
    npm run build && \
    rm -rf node_modules && \
    npm install --only=production && \
    cp -r node_modules dist && \
    mv dist/* ../ && \
    cd .. && \
    rm -rf ./tmp
