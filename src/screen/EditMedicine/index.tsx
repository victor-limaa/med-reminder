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

export const EditMedicineScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const [name, setName] = useState(item.name);
  const [reason, setReason] = useState(item.reason);
  const [type, setType] = useState(item.type);
  const [timeValue, setTimeValue] = useState(new Date(item.timeValue));
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
      const editedMedicine = { name, reason, type, timeValue };
      const res = await AsyncStorage.getItem("@medicines");

      if (res) {
        let medicines = JSON.parse(res);
        const foundMedicine = medicines.filter((med) => {
          return med.name != item.name && med.timeValue != item.timeValue;
        });
        foundMedicine.push(editedMedicine);
        await AsyncStorage.setItem("@medicines", JSON.stringify(foundMedicine));
        setIsLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setShowAlert(true);
    }
  };

  const handleDeleteMedicine = async () => {
    try {
      setIsLoading(true);
      const res = await AsyncStorage.getItem("@medicines");

      if (res) {
        let medicines = JSON.parse(res);
        const filteredMedicines = medicines.filter((med) => {
          return med.name != item.name && med.timeValue != item.timeValue;
        });
        await AsyncStorage.setItem(
          "@medicines",
          JSON.stringify(filteredMedicines)
        );
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
            value={name}
          />

          <FormControl.Label>Motivo</FormControl.Label>
          <Input
            placeholder="Motivo"
            onChangeText={(text) => setReason(text)}
            value={reason}
          />

          <FormControl.Label>Tipo</FormControl.Label>
          <Select
            accessibilityLabel="Tipo"
            placeholder="Tipo"
            onValueChange={(value) => setType(value)}
            selectedValue={type}
          >
            <Select.Item label="Comprimido" value="comprimidos" />
            <Select.Item label="Capsula" value="capsulas" />
            <Select.Item label="Injeção" value="injecao" />
            <Select.Item label="Outros" value="pote" />
          </Select>

          <FormControl.Label>Hora</FormControl.Label>

          <Pressable onPressIn={() => setShowTimePicker(true)}>
            <Input
              placeholder="Hora"
              isReadOnly={true}
              value={moment(timeValue).format("HH:mm")}
            />
          </Pressable>

          {showTimePicker ? (
            <DateTimePicker
              mode="time"
              value={timeValue}
              is24Hour={true}
              onChange={onChangeTimePicker}
              locale="pt-BR"
            />
          ) : null}
        </FormControl>

        <View
          position={"absolute"}
          bottom={10}
          w={"100%"}
          justifyContent={"center"}
          alignSelf={"center"}
        >
          <Button
            colorScheme={"fuchsia"}
            onPress={handleSubmitForm}
            isDisabled={!isFormValid}
            mb={4}
          >
            <Text fontWeight={"semibold"} color="white">
              Salvar
            </Text>
          </Button>

          <Button
            colorScheme={"warning"}
            onPress={handleDeleteMedicine}
            isDisabled={!isFormValid}
          >
            <Text fontWeight={"semibold"} color="white">
              Excluir
            </Text>
          </Button>
        </View>
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
            Não foi possível editar o remédio no momento. Tente novamente!
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
