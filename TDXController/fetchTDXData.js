import axios from "axios";

/**
 * 呼叫 TDX API
 */
async function fetchTDXData(apiUrl, accessToken) {
  try {
    // const token = await getValidAccessToken();
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "br,gzip", // 減少回傳資料量
      },
    });
    return response.data;
  } catch (error) {
    console.error("呼叫 TDX API 失敗:", error.response?.data || error.message);
    throw new Error("無法取得 API 資料");
  }
}

export default fetchTDXData;
