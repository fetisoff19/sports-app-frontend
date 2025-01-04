FROM node:lts-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i -g pnpm

RUN pnpm i

COPY ./ ./

RUN pnpm run build

FROM nginx:latest as production

COPY --from=development /usr/src/app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
