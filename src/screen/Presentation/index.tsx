import { Button, Heading, Icon, Image, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@enums/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PresentationScreen = ({ navigation }) => {
  const handleNextPage = async () => {
    await AsyncStorage.setItem("alreadyAccessed", "true");
    navigation.navigate("Home");
  };

  return (
    <View
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={Colors.white}
    >
      <Image
        alt="mascot-presentation"
        maxH={210}
        maxW={"80%"}
        source={require("../../assets/images/mascot.png")}
        mb={12}
      />
      <Heading fontWeight={600} size={"md"}>
        Bem vindo ao MedRemember!
      </Heading>
      <Text textAlign={"center"} mt={"2"}>
        Aqui nós iremos te ajudar a não esquecer dos teus remédios e manter a
        tua saúde!
      </Text>
      <Button
        position={"absolute"}
        bottom={10}
        variant={"ghost"}
        colorScheme={"fuchsia"}
        endIcon={<Icon as={Ionicons} name="arrow-forward" />}
        onPress={handleNextPage}
      >
        Próximo
      </Button>
    </View>
  );
};
