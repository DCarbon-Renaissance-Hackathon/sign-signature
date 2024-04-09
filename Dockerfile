FROM node:20.11.1-alpine3.19

WORKDIR app/

COPY ./package.json .

RUN yarn 

COPY src/ .

COPY ./tsconfig.json .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
