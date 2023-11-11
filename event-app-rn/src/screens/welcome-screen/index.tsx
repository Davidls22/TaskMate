import React from "react";
import { Image } from "react-native"; // Import the Image component
import { Box, Text } from "../../utils/theme";
import { AuthScreenNavigationType } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@shopify/restyle";
import Button from "../../components/shared/button";



const WelcomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();

  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };

  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[theme.colors.violet300, theme.colors.purple200,theme.colors.rose200, theme.colors.purple200,theme.colors.violet300]} 
        style={{ flex: 1 }}
      >
      <Box flex={1} justifyContent="center">
        <Box alignItems="center" mb="3.5">
        <Image
            source={require("../../components/images/penrose-square.png")} // Replace with the correct path to your image
            style={{ width: 100, height: 100 }} // Adjust the width and height as needed
          />
        </Box>
        <Text textAlign="center"
        variant="text3Xl"
        fontWeight="800"
        color="fuchsia900"
        >TaskMate</Text>
        <Box mt="5" mx="10">
        <Button label="Let's Get Organised!" 
        onPress={navigateToSignUpScreen}
        onLongPress={() => console.log("clicked some more")}/>
        </Box>
      </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
