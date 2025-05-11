import fetchTDXData from "./fetchTDXData.js";
// import parkTestData from "../testData/taichungCarParkData.json" assert { type: "json" };


//停車場基本資料-所需欄位(API篩選filter失效)
const selectParkData =
  "CarParkID,CarParkName,CarParkType,Telephone,CarParkPosition,Address,FareDescription,LiveOccuppancyAvailable,Toilet";
//停車場基本資料API URL
const TDX_PARKDATA_URL =
  "https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Taichung?$select=" +
  selectParkData +
  "&$format=json";


async function getParkData(accessToken) {
  try {
    const parkData = await fetchTDXData(TDX_PARKDATA_URL, accessToken);
    // const parkData = parkTestData;


    const filteredData = parkData.CarParks.map(item => ({
      CarParkID: item.CarParkID,
      CarParkName: item.CarParkName.Zh_tw, // 取繁體中文名稱
      CarParkType: item.CarParkType,
      Telephone: item.Telephone,
      CarParkPosition: item.CarParkPosition, // 直接保留 { PositionLat, PositionLon }
      Address: item.Address,
      FareDescription: item.FareDescription,
      LiveOccuppancyAvailable: item.LiveOccuppancyAvailable,
      Toilet: item.Toilet
    }));

    console.log("取得停車場資料成功");
    return filteredData;

  } catch (error) {
    console.error(error);
  }
}

export default getParkData;
