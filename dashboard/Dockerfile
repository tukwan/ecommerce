# FROM node:12-alpine

# WORKDIR /app

# COPY . ./

# RUN yarn install

# CMD ["yarn", "start"]


# pull official base image
FROM node:12-alpine as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
