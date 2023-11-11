import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "../../utils/theme";
import { AuthScreenNavigationType } from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import { Pressable } from "react-native";

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

  const navigateToSignInScreen = () => {
    navigation.navigate("SignUp");
  }; 

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center" >
        <Text variant="text2Xl" fontWeight="700" padding="6" color="fuchsia900">
          Hello Again!
        </Text>
        <Box mb="6" />
        <Input label="Email" />
        <Box mb="6" />
        <Input label="Password" />
        <Box mt="5.5" />
        <Pressable onPress={navigateToSignInScreen}>
          <Text>Register</Text>
        </Pressable>
        <Button label="Login" onPress={navigateToSignInScreen} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
