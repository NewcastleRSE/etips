# FROM node:lts AS build
#
# WORKDIR /app
#
# COPY package*.json .
#
# # RUN npm ci
#
# COPY . .
# # RUN npm run prisma-generate
# RUN npm run build
# RUN npm prune --production
#
# FROM node:lts AS run
#
# ENV NODE_ENV=production
#
# WORKDIR /app
# COPY --from=build /app/build ./build
# COPY --from=build /app/package.json ./package.json
# COPY --from=build /app/node_modules ./node_modules
# # COPY --from=build /app/prisma ./prisma
# RUN ulimit -c unlimited

FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY .npmrc .
RUN npm install
# COPY . .
RUN npm run build
RUN npm prune --production

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ] ENTRYPOINT ["node", "build"]
