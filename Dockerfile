# 使用 Node.js 作為基礎映像
FROM node:18-alpine

# 安裝 AWS CLI 所需套件並安裝 AWS CLI
RUN apk add --no-cache curl unzip bash python3 py3-pip groff less && \
    pip3 install awscli && \
    aws --version

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package.json package-lock.json ./

# 安裝依賴，跳過 devDependencies
RUN npm ci --omit=dev

# 複製專案檔案(生產佈署階段)
COPY . .

# 複製並設定 entrypoint.sh 為可執行

RUN chmod +x ./entrypoint.sh

# 暴露 API 端口（例如 5000）
EXPOSE 3000

# 用 entrypoint.sh 當容器啟動入口點
ENTRYPOINT ["/app/entrypoint.sh"]

# 啟動 Express 伺服器（使用 Nodemon 以便開發時自動重啟）
# CMD ["npm", "start"]