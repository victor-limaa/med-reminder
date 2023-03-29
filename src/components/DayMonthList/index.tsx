import { useEffect, useState } from "react";
import moment from "moment";
import DaysOfWeek from "@enums/daysOfWeek";
import { Box, Pressable, ScrollView, Text, View } from "native-base";
import Months from "@enums/months";

export const DayMonthList = ({ selectedData, setSelectedData }) => {
  const currentMoment = moment();
  const [restOfDaysMonth, setRestDaysMonth] = useState<
    Array<{ day: string; date: number }>
  >([]);

  const handleDaysOfTheMonth = () => {
    const amountDaysOfMonth = currentMoment.daysInMonth();
    const curranteDateNumber = currentMoment.date();
    const restDays = [];
    for (
      let dateDay = curranteDateNumber;
      dateDay <= amountDaysOfMonth;
      dateDay++
    ) {
      restDays.push({
        day: DaysOfWeek[currentMoment.date(dateDay).day()],
        date: dateDay,
        month: currentMoment.month(),
      });
    }
    return setRestDaysMonth(restDays);
  };

  useEffect(() => {
    handleDaysOfTheMonth();
  }, []);

  return (
    <>
      <View flexDirection={"row"} justifyContent={"flex-end"} mt="4">
        <Text fontWeight={"thin"}>{`${
          Months[currentMoment.month()]
        }, ${currentMoment.year()}`}</Text>
      </View>
      <ScrollView horizontal maxH={"20"}>
        {restOfDaysMonth.map((item, index) => {
          return (
            <Pressable key={index} onPress={() => setSelectedData(item)}>
              {({ isPressed }) => {
                return (
                  <Box
                    bg={
                      isPressed
                        ? "fuchsia.600"
                        : selectedData == item
                        ? "fuchsia.400"
                        : "fuchsia.200"
                    }
                    p={"3"}
                    m={"1"}
                    alignItems="center"
                    justifyItems={"center"}
                    borderRadius={"xl"}
                    width={"16"}
                  >
                    <Text
                      fontWeight={"semibold"}
                      color={
                        selectedData == item || isPressed ? "white" : "black"
                      }
                    >
                      {item.day}
                    </Text>
                    <Text
                      color={
                        selectedData == item || isPressed ? "white" : "black"
                      }
                    >
                      {item.date}
                    </Text>
                  </Box>
                );
              }}
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
};
