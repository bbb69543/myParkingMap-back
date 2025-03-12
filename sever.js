import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // 讀取 .env 檔案

const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// 從環境變數讀取 TDX API 憑證
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
console.log(CLIENT_ID);

// 存放 Access Token 快取
let accessToken = null;
let tokenExpiry = 0; // Token 過期時間（UNIX 時間戳）

/**
 * 取得有效的 Access Token（快取機制）
 */
// async function getAccessToken() {
//     const currentTime = Math.floor(Date.now() / 1000); // 目前時間（秒）

//     if (accessToken && currentTime < tokenExpiry) {
//         console.log('✅ 使用快取的 Access Token');
//         return accessToken; // 回傳快取的 Token
//     }

//     console.log('🔄 Access Token 過期，重新取得中...');

//     try {
//         const response = await axios.post(
//             'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
//             new URLSearchParams({
//                 grant_type: 'client_credentials',
//                 client_id: CLIENT_ID,
//                 client_secret: CLIENT_SECRET,
//             }),
//             {
//                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//             }
//         );

//         // 更新 Token 及過期時間
//         accessToken = response.data.access_token;
//         tokenExpiry = Math.floor(Date.now() / 1000) + response.data.expires_in - 300; // 提前 5 分鐘刷新 Token

//         console.log('✅ 取得新的 Access Token');
//         return accessToken;
//     } catch (error) {
//         console.error('❌ 無法取得 Access Token:', error.response?.data || error.message);
//         throw new Error('Failed to get Access Token');
//     }
// }

app.use(cors(corsOptions));

app.get("/api/parkingLot", (req, res) => {
  res.json({ mimi: { mi1: 1, mi2: 2, mi3: 3 } });
});

app.listen(port, () => console.log("Server running on port 3000"));
