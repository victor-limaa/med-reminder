import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddMedicineScreen } from "@screen/AddMedicine";
import { HomeScreen } from "@screen/Home";
import { PresentationScreen } from "@screen/Presentation";
import { View } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

const Stack = createStackNavigator();

const Routes = () => {
  const [initialRouteName, setInitialRouteName] = useState("");

  const handleSetInitialScreen = async () => {
    const alreadyAccessed = await AsyncStorage.getItem("alreadyAccessed");
    alreadyAccessed === "true"
      ? setInitialRouteName("Home")
      : setInitialRouteName("Presentation");
  };

  useEffect(() => {
    handleSetInitialScreen();
  }, []);

  return (
    <NavigationContainer>
      {initialRouteName ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={initialRouteName}
        >
          <Stack.Screen name="Presentation" component={PresentationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            options={{ headerShown: true }}
            name="AddMedicine"
            component={AddMedicineScreen}
          />
        </Stack.Navigator>
      ) : (
        <View flex={1} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={42} />
        </View>
      )}
    </NavigationContainer>
  );
};

export default Routes;
