
FROM node:14-alpine AS BUILD_IMAGE

RUN mkdir -p /home/node-app/node-react

WORKDIR /home/node-app/node-react

COPY . /home/node-app/node-react/

RUN yarn install --frozen-lockfile

# COPY . .

# RUN yarn build

# FROM alpine           

# # 创建app目录
# # RUN mkdir -p /home/node-app/node-react

# # 设置工作目录
# WORKDIR /home/node-app/node-react

# # 拷贝package.json文件到工作目录
# # !!重要：package.json需要单独添加。
# # Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# # 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# # 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
# # COPY package.json /home/node-app/node-react/package.json
# # 安装npm依赖(使用淘宝的镜像源)
# # 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
# # RUN yarn install --production=false
# COPY --from=builder /home/node-app/node-react ./node_modules
# # 拷贝所有源代码到工作目录

# 暴露容器端口
EXPOSE 8099

# 启动node应用
CMD ["yarn","prod"]
