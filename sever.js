import express from "express";
import axios from "axios";
import cors from "cors";
import getAccessToken from "./TDXController/getAccessToken.js";
import getParkData from "./TDXController/getParkData.js";

const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// 存放 Access Token 快取
let accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJER2lKNFE5bFg4WldFajlNNEE2amFVNm9JOGJVQ3RYWGV6OFdZVzh3ZkhrIn0.eyJleHAiOjE3NDIxMDc1MTQsImlhdCI6MTc0MjAyMTExNCwianRpIjoiMzM4ODNlZDMtYTIxZC00ZjRkLWEwNjktZGI3ODEwOGJlZWMyIiwiaXNzIjoiaHR0cHM6Ly90ZHgudHJhbnNwb3J0ZGF0YS50dy9hdXRoL3JlYWxtcy9URFhDb25uZWN0Iiwic3ViIjoiOGRhYzExYTItMTcyOS00MjRmLWE3NWItZGY2YmFkNTIyYTJlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmJiNjk1NDMtMjk2YjM4NDAtN2NmMy00NmY5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJzdGF0aXN0aWMiLCJwcmVtaXVtIiwicGFya2luZ0ZlZSIsIm1hYXMiLCJhZHZhbmNlZCIsImdlb2luZm8iLCJ2YWxpZGF0b3IiLCJ0b3VyaXNtIiwiaGlzdG9yaWNhbCIsImN3YSIsImJhc2ljIl19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJ1c2VyIjoiM2FkZTU2NzYifQ.Nf2zh1PKi0ffYoY9gQTfAHr06C4GC8CT7sdv5PswncTskTaRT1ikyVCVYHsWlpt07bheSeg0C876IYf_R3CQvWFwgDMZk7Of8ivDghCCdIyQx2mCBxqNWKEzM1yKmt8Pcx35Sva1rr0ZhKW_nugNVKt5YfevxUZ1Y6vb6CyjRo2ISECnzH0L1jkf7SXeNjRgbReOvTpbhp_8qNpqYulm5n8rR5bTvwXqNYWk_Gw8nVawP98uknWb00ExN9NlDkAihfCBzEGne4G6gAqpNDyL4Cg0k_vG3TQ3xu8mlDxqH0E_KAF_ld0DO5YE0C2dCEScf0tOlO7xI3cXZB_ND3derQ";
let tokenExpiry = 1742107215; // Token 過期時間（UNIX 時間戳）

getAccessToken(accessToken, tokenExpiry);

let ParkData =await getParkData(accessToken);
// console.log(ParkData);

app.use(cors(corsOptions));

app.get("/api/parkingLot", (req, res) => {
  res.json(ParkData);
});

app.listen(port, () => console.log("Server running on port 3000"));
