import { DayMonthList } from "@components/DayMonthList";
import { Button, Icon, Pressable, Text, View } from "native-base";
import { useEffect, useState } from "react";
import moment from "moment";
import DaysOfWeek from "@enums/daysOfWeek";
import Months from "@enums/months";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = ({ navigation }) => {
  const currentMoment = moment();
  const today = {
    day: DaysOfWeek[currentMoment.day()],
    date: currentMoment.date(),
    month: currentMoment.month(),
  };
  const [selectedData, setSelectedData] = useState(today);

  const setDayHeaderText = () => {
    const selectedDateFormated = moment({
      date: selectedData.date,
      month: selectedData.month,
    }).format("DD/MM/YY");

    return currentMoment.format("DD/MM/YY") == selectedDateFormated
      ? "Hoje"
      : currentMoment.date(today.date + 1).format("DD/MM/YY") ==
        selectedDateFormated
      ? "Amanhã"
      : `${selectedData.day}, ${selectedData.date} de ${
          Months[selectedData.month]
        }`;
  };

  const getMedicinesList = async () => {
    try {
      const MEDICINES = await AsyncStorage.getItem("@medicines");
      console.log(JSON.parse(MEDICINES));
    } catch (error) {}
  };

  useEffect(() => {
    getMedicinesList();
  }, []);

  return (
    <View flex={1} paddingY={"6"} paddingX={"2"}>
      <DayMonthList
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <View
        mt={"4"}
        px="2"
        flexDir="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Text fontWeight={"semibold"} fontSize={"lg"}>
          {setDayHeaderText()}
        </Text>
        <Pressable onPress={() => navigation.navigate("AddMedicine")}>
          <Icon as={Ionicons} name="add" size={"xl"} color="black" />
        </Pressable>
      </View>
    </View>
  );
};
