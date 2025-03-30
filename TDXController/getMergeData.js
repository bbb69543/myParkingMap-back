function getMergeData(parkData, ParkSpaceMap) {
    try {
  
      const mergedParkData = parkData.map(
        ({
          CarParkID,
          CarParkName,
          CarParkType,
          Telephone,
          CarParkPosition,
          Address,
          FareDescription,
          LiveOccuppancyAvailable,
          Toilet,
        }) => ({
          CarParkID,
          CarParkName,
          CarParkType,
          Telephone,
          CarParkPosition,
          Address,
          FareDescription,
          LiveOccuppancyAvailable,
          Toilet,
          Spaces: ParkSpaceMap[CarParkID] || [],
        })
      );
      console.log("合併資料成功");
      return mergedParkData;

    } catch (error) {
      console.error(error);
    }
  }
  
  export default getMergeData;