import { DayMonthList } from "@components/DayMonthList";
import {
  Box,
  Button,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
} from "native-base";
import { useEffect, useState } from "react";
import moment from "moment";
import DaysOfWeek from "@enums/daysOfWeek";
import Months from "@enums/months";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = ({ navigation }) => {
  // const currentMoment = moment();
  // const today = {
  //   day: DaysOfWeek[currentMoment.day()],
  //   date: currentMoment.date(),
  //   month: currentMoment.month(),
  // };
  // const [selectedData, setSelectedData] = useState(today);
  const [medicinesList, setMedicinesList] = useState([]);

  const icons = {
    capsulas: require("@assets/icons/capsulas.png"),
    comprimidos: require("@assets/icons/comprimidos.png"),
    injecao: require("@assets/icons/injecao.png"),
    pote: require("@assets/icons/pote.png"),
  };

  // const setDayHeaderText = () => {
  //   const selectedDateFormated = moment({
  //     date: selectedData.date,
  //     month: selectedData.month,
  //   }).format("DD/MM/YY");

  //   return currentMoment.format("DD/MM/YY") == selectedDateFormated
  //     ? "Hoje"
  //     : currentMoment.date(today.date + 1).format("DD/MM/YY") ==
  //       selectedDateFormated
  //     ? "Amanhã"
  //     : `${selectedData.day}, ${selectedData.date} de ${
  //         Months[selectedData.month]
  //       }`;
  // };

  const getMedicinesList = async () => {
    try {
      const MEDICINES = await AsyncStorage.getItem("@medicines");
      MEDICINES
        ? setMedicinesList(JSON.parse(MEDICINES))
        : setMedicinesList([]);
    } catch (error) {
      setMedicinesList([]);
    }
  };

  useEffect(() => {
    getMedicinesList();
  }, []);

  return (
    <View flex={1} paddingY={"6"} paddingX={"2"}>
      {/* <DayMonthList
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      /> */}
      <View
        mt={"4"}
        px="2"
        flexDir="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Text fontWeight={"semibold"} fontSize={"lg"}>
          {/* {setDayHeaderText()} */}
          Medicamentos
        </Text>
        <Pressable onPress={() => navigation.navigate("AddMedicine")}>
          <Icon as={Ionicons} name="add" size={"xl"} color="black" />
        </Pressable>
      </View>
      <ScrollView>
        {medicinesList.length
          ? medicinesList.map((item) => {
              return (
                <Pressable
                  onPress={() => navigation.navigate("EditMedicine", { item })}
                >
                  {({ isPressed }) => {
                    return (
                      <Box
                        flexDir={"row"}
                        alignItems={"center"}
                        p={"2"}
                        bg={isPressed ? "fuchsia.400" : "fuchsia.200"}
                        m={"2"}
                        borderRadius={"xl"}
                      >
                        <Image
                          alt="medicine-icon"
                          size={20}
                          source={icons[item.type]}
                        />
                        <View ml={"2"}>
                          <Heading
                            color={isPressed ? "white" : "trueGray.800"}
                            fontSize={"md"}
                          >
                            {item.name}
                          </Heading>
                          <Text color={isPressed ? "white" : "trueGray.800"}>
                            {item.reason}
                          </Text>
                        </View>
                      </Box>
                    );
                  }}
                </Pressable>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};
