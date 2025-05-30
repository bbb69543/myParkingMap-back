#!/bin/sh

# 保證任何指令失敗會退出
set -e

# 從 AWS Parameter Store 讀取參數，並設定環境變數
export CLIENT_ID=$(aws ssm get-parameter --name "/myParkingMap/dev/CLIENT_ID" --with-decryption --query "Parameter.Value" --output text)
export CLIENT_SECRET=$(aws ssm get-parameter --name "/myParkingMap/dev/CLIENT_SECRET" --with-decryption --query "Parameter.Value" --output text)

# 這邊可以加入更多需要的環境變數...

# 啟動 Node.js 應用
npm start
