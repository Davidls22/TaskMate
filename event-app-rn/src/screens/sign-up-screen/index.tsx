import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "../../utils/theme";
import { AuthScreenNavigationType } from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import { registerUser } from "../../services/api"
import { Controller, useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: IUser) => {
    try {
      const { email, name, password } = data
      /**
       * register user
       */
      await registerUser({
        email,
        name,
        password,
      })
      showMessage({
        message: "Registered successfully",
        type: "success",
      });
      navigateToSignInScreen()
    } catch (error) {}
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" mt={"13"}>
        <Text variant="textXl" fontWeight="700">
          Welcome to TaskMate!
        </Text>
        <Text variant="textLg" fontWeight="700" mb="6">
          Get yourself organised here! 
        </Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              error={errors.name}
            />
          )}
          name="name"
        />
        <Box mb="3" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email}
            />
          )}
          name="email"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.name}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mt="5.5" />
        <Pressable onPress={navigateToSignInScreen}>
          <Text color="primary" textAlign="right">
            Log in?
          </Text>
        </Pressable>
        <Box mb="5.5" />

        <Button label="Register" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  )
};
export default SignUpScreen;
