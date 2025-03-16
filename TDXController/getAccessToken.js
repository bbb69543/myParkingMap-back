import axios from "axios";
import dotenv from "dotenv";
dotenv.config(); // 讀取 .env 檔案

// 從環境變數讀取 TDX API 憑證
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

//取得Access Token URL取
const TOKEN_URL =
  "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

/**
 * 取得有效的 Access Token（快取機制）
 */
async function getAccessToken(accessToken, tokenExpiry) {
  const currentTime = Math.floor(Date.now() / 1000); // 目前時間（秒）

  if (accessToken && currentTime < tokenExpiry) {
    console.log("✅ 使用快取的 Access Token");
    return accessToken; // 回傳快取的 Token
  }

  console.log("🔄 Access Token 過期，重新取得中...");

  try {
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    // 更新 Token 及過期時間
    accessToken = response.data.access_token;
    // console.log(accessToken);
    tokenExpiry =
      Math.floor(Date.now() / 1000) + response.data.expires_in - 300; // 提前 5 分鐘刷新 Token
    // console.log(tokenExpiry);
    console.log("✅ 取得新的 Access Token");
    return accessToken;
  } catch (error) {
    console.error(
      "❌ 無法取得 Access Token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get Access Token");
  }
}

export default getAccessToken;
