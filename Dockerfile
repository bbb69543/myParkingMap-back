# 使用 Node.js 作為基礎映像
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm install

# 複製專案檔案
COPY . .

# 暴露 API 端口（例如 5000）
EXPOSE 3000

# 啟動 Express 伺服器（使用 Nodemon 以便開發時自動重啟）
CMD ["npm", "run", "dev"]