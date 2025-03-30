import fetchTDXData from "./fetchTDXData.js";
// import parkTestData from "../testData/taichungCarParkData.json" assert { type: "json" };
import parkTestSpace from "../testData/ParkingSpace.json" assert { type: "json" };

//停車場基本資料-所需欄位(API篩選filter失效)
// const selectParkData =
//   "CarParkID,CarParkName,CarParkType,Telephone,CarParkPosition,Address,FareDescription,LiveOccuppancyAvailable,Toilet";
// //停車場基本資料API URL
// const TDX_PARKDATA_URL =
//   "https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Taichung?$select=" +
//   selectParkData +
//   "&$format=json";

//停車場車位數-所需欄位(API篩選filter失效)
const selectSpaceData = "CarParkID,Spaces";
//停車場車位數API URL
const TDX_SpaceDATA_URL =
  "https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/ParkingSpace/City/Taichung?$select=" +
  selectSpaceData +
  "&$format=json";

async function getSpaceData(accessToken) {
  try {

    // const parkSpace = await fetchTDXData(TDX_SpaceDATA_URL, accessToken);

    const parkSpace = parkTestSpace;

    const ParkSpaceMap = parkSpace.ParkingSpaces.reduce((map, item) => {
      map[item.CarParkID] = (item.Spaces || []).map(
        ({ SpaceType, NumberOfSpaces }) => ({
          SpaceType,
          NumberOfSpaces,
        })
      );
      return map;
    }, {});

    console.log("取得車位數資料成功");
    return ParkSpaceMap;

  } catch (error) {
    console.error(error);
  }
}

export default getSpaceData;