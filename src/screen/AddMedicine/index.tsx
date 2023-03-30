import {
  AlertDialog,
  Button,
  FormControl,
  Input,
  Pressable,
  Select,
  Text,
  View,
  Modal,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

export const AddMedicineScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [timeValue, setTimeValue] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeTimePicker = (_, selectedTime) => {
    const currentDate = selectedTime;
    setShowTimePicker(false);
    setTimeValue(currentDate);
  };

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      // await AsyncStorage.removeItem("@medicines");
      const newMedicine = { name, reason, type, timeValue };
      const MEDICINES = await AsyncStorage.getItem("@medicines");

      if (MEDICINES) {
        let valueToStorage = [JSON.parse(MEDICINES)];
        valueToStorage.push(newMedicine);
        valueToStorage = JSON.stringify(valueToStorage);
        await AsyncStorage.setItem("@medicines", valueToStorage);
        setIsLoading(false);
        navigation.navigate("Home");
      } else {
        const valueToStorage = JSON.stringify([newMedicine]);
        await AsyncStorage.setItem("@medicines", valueToStorage);
        setIsLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setShowAlert(true);
    }
  };

  const verifyFormIsValid = () => {
    name && reason && type && timeValue
      ? setIsFormValid(true)
      : setIsFormValid(false);
  };

  useEffect(() => {
    verifyFormIsValid();
  }, [
    name,
    setName,
    reason,
    setReason,
    type,
    setType,
    timeValue,
    setTimeValue,
  ]);

  return (
    <>
      <View flex={1} bg="white" p={"6"}>
        <FormControl w="100%">
          <FormControl.Label>Nome do Remédio</FormControl.Label>
          <Input
            placeholder="Nome do Remedio"
            onChangeText={(text) => setName(text)}
          />

          <FormControl.Label>Motivo</FormControl.Label>
          <Input
            placeholder="Motivo"
            onChangeText={(text) => setReason(text)}
          />

          <FormControl.Label>Tipo</FormControl.Label>
          <Select
            accessibilityLabel="Tipo"
            placeholder="Tipo"
            onValueChange={(value) => setType(value)}
          >
            <Select.Item label="Comprimido" value="Comprimido" />
            <Select.Item label="Capsula" value="Capsula" />
            <Select.Item label="Infeção" value="Infeção" />
            <Select.Item label="Spray" value="Spray" />
          </Select>

          <FormControl.Label>Hora</FormControl.Label>

          <Pressable onPressIn={() => setShowTimePicker(true)}>
            <Input
              placeholder="Hora"
              isReadOnly={true}
              value={moment(timeValue).format("HH:mm")}
            />
          </Pressable>

          {showTimePicker && (
            <DateTimePicker
              mode="time"
              value={timeValue}
              is24Hour={true}
              onChange={onChangeTimePicker}
              locale="pt-BR"
              // timeZoneOffsetInMinutes={0}
            />
          )}
        </FormControl>

        <Button
          position={"absolute"}
          bottom={10}
          w={"100%"}
          alignSelf="center"
          colorScheme={"fuchsia"}
          onPress={handleSubmitForm}
          isDisabled={!isFormValid}
        >
          <Text fontWeight={"semibold"} color="white">
            Adicionar
          </Text>
        </Button>
      </View>
      <AlertDialog
        leastDestructiveRef={React.useRef(null)}
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Adicionar Remédio</AlertDialog.Header>
          <AlertDialog.Body>
            Não foi possível adicionar novo remédio no momento. Tente novamente!
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>

      <Modal isOpen={isLoading}>
        <Modal.Content bg={"transparent"} shadow={"none"}>
          <Modal.Body>
            <ActivityIndicator size={42} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
