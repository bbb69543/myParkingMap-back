function getMergeData(parkData, parkSpaceMap, availableSpacesMap) {
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
          // Spaces: parkSpaceMap[CarParkID] || [],
          AvailableSpaces: availableSpacesMap[CarParkID] || parkSpaceMap[CarParkID] || [],
        })
      );

      const result = {};
      result.UpdateTime = availableSpacesMap.updateTime;
      result.Data = mergedParkData;

      console.log("合併資料成功!");
      return result;

    } catch (error) {
      console.error(error);
    }
  }
  
  export default getMergeData;