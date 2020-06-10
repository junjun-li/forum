# build stage
# 指定一个运行环境
FROM node:10 as build-stage
# 谁在维护这个项目
LABEL maintainer="11776174@qq.com"
# 创建一个工作目录
WORKDIR /app
# 把所有的文件复制到镜像中去 添加.dockerignore文件 copy的时候就不会复制不相关的文件
COPY . .
# 使用淘宝源装包
RUN npm --registry https://registry.npm.taobao.org install

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]