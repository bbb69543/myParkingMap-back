import express from "express";
import cors from "cors";
import getAccessToken from "./TDXController/getAccessToken.js";
import getParkData from "./TDXController/getParkData.js";
import getSpaceData from "./TDXController/getSpaceData.js";
import getAvailableSpace from "./TDXController/getAvailableSpace.js";
import getMergeData from "./TDXController/getMergeData.js";

const app = express();
const port = 3000;
const corsOptions = {
  origin: [
    "http://localhost",
    "http://localhost:5173",
    "https://my-parking-map-front.vercel.app"
  ],
};

// 存放 Access Token 快取
let accessToken = "";
let tokenExpiry = 0; // Token 過期時間（UNIX 時間戳）
[accessToken, tokenExpiry] = await getAccessToken(accessToken, tokenExpiry);
// console.log(accessToken);

//存放停車場基本資料
let ParkData = null;
let SpaceData = null;
let parkDataExpiry = 0; // 資料過期時間（UNIX 時間戳）

//存放及時車位數資料
let AvailableSpaces = null;
let availableSpaceDataExpiry = 0; // 資料過期時間（UNIX 時間戳）

app.use(cors(corsOptions));
// app.use(cors()); //lambda

app.get("/api/parkingLot", async (req, res) => {
  const currentTime = Math.floor(Date.now() / 1000); // 目前時間（秒）

  accessToken, tokenExpiry = await getAccessToken(accessToken, tokenExpiry);

  if (ParkData && currentTime < parkDataExpiry) {
    console.log("無須更新停車場基本資料");
  } else {
    ParkData = await getParkData(accessToken);
    SpaceData = await getSpaceData(accessToken);
    parkDataExpiry = Math.floor(Date.now() / 1000) + 2592000; // 30天刷新
    console.log("更新停車場基本資料")
  }

  if (AvailableSpaces && currentTime < availableSpaceDataExpiry) {
    console.log("無須更新最新停車位資料");
  } else {
    AvailableSpaces = await getAvailableSpace(accessToken);
    availableSpaceDataExpiry = Math.floor(Date.now() / 1000) + 300; // 5分鐘刷新
    console.log("更新最新停車位資料")
  }

  const initialParkData = getMergeData(ParkData, SpaceData, AvailableSpaces);
  res.json(initialParkData);
});

app.get("/", (req, res) => {
  const initialParkData = getMergeData(ParkData, SpaceData, AvailableSpaces);
  res.json(initialParkData);
})

// app.listen(port, () => console.log("Server running on port 3000"));

//AWS Lamba
export default app;