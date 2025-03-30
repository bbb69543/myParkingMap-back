import express from "express";
import axios from "axios";
import cors from "cors";
import getAccessToken from "./TDXController/getAccessToken.js";
import getParkData from "./TDXController/getParkData.js";
import getSpaceData from "./TDXController/getSpaceData.js";
import getMergeData from "./TDXController/getMergeData.js";

const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// 存放 Access Token 快取
let accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJER2lKNFE5bFg4WldFajlNNEE2amFVNm9JOGJVQ3RYWGV6OFdZVzh3ZkhrIn0.eyJleHAiOjE3NDIxMDc1MTQsImlhdCI6MTc0MjAyMTExNCwianRpIjoiMzM4ODNlZDMtYTIxZC00ZjRkLWEwNjktZGI3ODEwOGJlZWMyIiwiaXNzIjoiaHR0cHM6Ly90ZHgudHJhbnNwb3J0ZGF0YS50dy9hdXRoL3JlYWxtcy9URFhDb25uZWN0Iiwic3ViIjoiOGRhYzExYTItMTcyOS00MjRmLWE3NWItZGY2YmFkNTIyYTJlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmJiNjk1NDMtMjk2YjM4NDAtN2NmMy00NmY5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJzdGF0aXN0aWMiLCJwcmVtaXVtIiwicGFya2luZ0ZlZSIsIm1hYXMiLCJhZHZhbmNlZCIsImdlb2luZm8iLCJ2YWxpZGF0b3IiLCJ0b3VyaXNtIiwiaGlzdG9yaWNhbCIsImN3YSIsImJhc2ljIl19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJ1c2VyIjoiM2FkZTU2NzYifQ.Nf2zh1PKi0ffYoY9gQTfAHr06C4GC8CT7sdv5PswncTskTaRT1ikyVCVYHsWlpt07bheSeg0C876IYf_R3CQvWFwgDMZk7Of8ivDghCCdIyQx2mCBxqNWKEzM1yKmt8Pcx35Sva1rr0ZhKW_nugNVKt5YfevxUZ1Y6vb6CyjRo2ISECnzH0L1jkf7SXeNjRgbReOvTpbhp_8qNpqYulm5n8rR5bTvwXqNYWk_Gw8nVawP98uknWb00ExN9NlDkAihfCBzEGne4G6gAqpNDyL4Cg0k_vG3TQ3xu8mlDxqH0E_KAF_ld0DO5YE0C2dCEScf0tOlO7xI3cXZB_ND3derQ";
let tokenExpiry = 5742107215; // Token 過期時間（UNIX 時間戳）


//存放停車場基本資料
let ParkData = await getParkData(accessToken);
let parkDataExpiry = 5742107215; // 資料過期時間（UNIX 時間戳）

//存放及時車位數資料
let SpaceData = await getSpaceData(accessToken);
let spaceDataExpiry = 5742107215; // 資料過期時間（UNIX 時間戳）

app.use(cors(corsOptions));

app.get("/api/parkingLot", async (req, res) => {
  const currentTime = Math.floor(Date.now() / 1000); // 目前時間（秒）

  // accessToken, tokenExpiry = getAccessToken(accessToken, tokenExpiry); 保持最新的token使用

  if (ParkData && currentTime < parkDataExpiry) {
    console.log("無須更新停車場基本資料");
  } else {
    ParkData = await getParkData(accessToken);
    parkDataExpiry = Math.floor(Date.now() / 1000) + 2592000; // 30天刷新
    console.log("更新停車場基本資料")
  }

  if (SpaceData && currentTime < spaceDataExpiry) {
    console.log("無須更新最新停車位資料");
  } else {
    SpaceData = await getSpaceData(accessToken);
    spaceDataExpiry = Math.floor(Date.now() / 1000) + 300; // 5分鐘刷新
    console.log("更新最新停車位資料")
  }

  const initialParkData = getMergeData(ParkData, SpaceData);
  res.json(initialParkData);
});

app.get("/", (req, res) => {
  const initialParkData = getMergeData(ParkData, SpaceData);
  res.json(initialParkData);
})

app.listen(port, () => console.log("Server running on port 3000"));
