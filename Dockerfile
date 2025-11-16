# 使用官方 Node.js 运行时作为构建阶段基础镜像
FROM node:22-alpine AS builder

# 安装必要的系统工具（用于健康检查等）
RUN apk add --no-cache curl

# 设置工作目录
WORKDIR /app

# 复制必要的文件
COPY package.json package-lock.json* ./
COPY .next ./.next
COPY public ./public

# 在容器内安装生产依赖
RUN npm ci --only=production --ignore-scripts

# 清理缓存
RUN npm cache clean --force

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=30000
ENV HOSTNAME="0.0.0.0"

# 暴露端口
EXPOSE 30000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:30000/health || exit 1

# 启动应用
CMD ["npm", "start"]