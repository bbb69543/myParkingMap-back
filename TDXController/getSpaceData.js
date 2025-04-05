import fetchTDXData from "./fetchTDXData.js";
import parkTestSpace from "../testData/ParkingSpace.json" assert { type: "json" };


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

    const updateTime = parkSpace.UpdateTime;
    ParkSpaceMap.updateTime = updateTime;

    console.log("取得車位數資料成功");
    return ParkSpaceMap;

  } catch (error) {
    console.error(error);
  }
}

export default getSpaceData;