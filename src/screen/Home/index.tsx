import { DayMonthList } from "@components/DayMonthList";
import { Text, View } from "native-base";
import { useState } from "react";

export const HomeScreen = () => {
  const [selectedData, setSelectedData] = useState();

  return (
    <View flex={1} paddingY={"6"} paddingX={"2"}>
      <Text>Home</Text>
      <DayMonthList
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </View>
  );
};
