import {
  Button,
  FormControl,
  Input,
  Pressable,
  Select,
  Text,
  View,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import moment from "moment";

export const AddMedicineScreen = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [timeValue, setTimeValue] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeTimePicker = (_, selectedTime) => {
    const currentDate = selectedTime;
    setShowTimePicker(false);
    setTimeValue(currentDate);
  };

  const handleSubmitForm = () => {
    console.log({
      name,
      reason,
      type,
      timeValue,
    });
  };

  return (
    <View flex={1} bg="white" p={"6"}>
      <FormControl w="100%">
        <FormControl.Label>Nome do Remédio</FormControl.Label>
        <Input
          placeholder="Nome do Remedio"
          onChange={(text) => setName(text)}
        />

        <FormControl.Label>Motivo</FormControl.Label>
        <Input placeholder="Motivo" onChange={(text) => setReason(text)} />

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
            value={moment(timeValue).format("hh:mm")}
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
      >
        <Text fontWeight={"semibold"} color="white">
          Adicionar
        </Text>
      </Button>
    </View>
  );
};
