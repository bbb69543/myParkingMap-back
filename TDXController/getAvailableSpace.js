import fetchTDXData from "./fetchTDXData.js";

// import parkTestSpace from "../testData/ParkingAvailability.json" assert { type: "json" };


//停車場車位數-所需欄位(API篩選filter失效)
const selectSpaceData = "CarParkID,Availabilities";
//停車場車位數API URL
const TDX_SpaceDATA_URL =
  "https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/ParkingAvailability/City/Taichung?$select=" +
  selectSpaceData +
  "&$format=json";

async function getAvailableSpace(accessToken) {
  try {

    const parkSpace = await fetchTDXData(TDX_SpaceDATA_URL, accessToken);

    // const parkSpace = parkTestSpace;

    const ParkSpaceMap = parkSpace.ParkingAvailabilities.reduce((map, item) => {
      map[item.CarParkID] = (item.Availabilities || []).map(
        ({ SpaceType, NumberOfSpaces, AvailableSpaces }) => ({
          SpaceType,
          NumberOfSpaces,
          AvailableSpaces,
        })
      );
      return map;
    }, {});

    const updateTime = parkSpace.UpdateTime;
    ParkSpaceMap.updateTime = updateTime;

    console.log("取得可停車位數資料成功");
    return ParkSpaceMap;

  } catch (error) {
    console.error(error);
  }
}

export default getAvailableSpace;