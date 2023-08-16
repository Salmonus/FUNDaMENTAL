import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "ChakraPetch-Light": require("../assets/fonts/ChakraPetch-Light.ttf"),
    "ChakraPetch-Regular": require("../assets/fonts/ChakraPetch-Regular.ttf"),
    "ChakraPetch-Medium": require("../assets/fonts/ChakraPetch-Medium.ttf"),
    "ChakraPetch-Bold": require("../assets/fonts/ChakraPetch-Bold.ttf"),
  });
