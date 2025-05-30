# 使用 Debian 版 Node 18
FROM node:18

# 安裝 curl 和 unzip 等工具
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    bash \
    python3 \
    python3-pip \
    groff \
    less \
  && rm -rf /var/lib/apt/lists/*

# 安裝 AWS CLI v2 (官方建議方法)
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  && unzip awscliv2.zip \
  && ./aws/install \
  && rm -rf awscliv2.zip aws

# 確認 awscli 版本
RUN aws --version

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