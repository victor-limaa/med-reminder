import "react-native-gesture-handler";
import { PresentationScreen } from "./src/screen/Presentation";
import { StatusBar } from "expo-status-bar";
import { extendTheme, NativeBaseProvider, View } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import Routes from "./src/routes";

SplashScreen.preventAutoHideAsync();

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: "PoppinsLight",
      },
      200: {
        normal: "PoppinsLight",
      },
      300: {
        normal: "PoppinsRegular",
      },
      400: {
        normal: "PoppinsRegular",
      },
      500: {
        normal: "PoppinsMedium",
      },
      600: {
        normal: "PoppinsSemiBold",
      },
      700: {
        normal: "PoppinsBold",
      },
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("./assets/fonts/poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/poppins/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
    PoppinsLight: require("./assets/fonts/poppins/Poppins-Light.ttf"),
    PoppinsMedium: require("./assets/fonts/poppins/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <View flex={1} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Routes />
      </View>
    </NativeBaseProvider>
  );
}
