import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "../../utils/theme";
import { AuthScreenNavigationType } from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import { Pressable } from "react-native";
import { loginUser } from "../../services/api"
import useUserGlobalStore from "../../store/useUserGlobalStore";
import { Controller, useForm } from "react-hook-form"
import { showMessage } from "react-native-flash-message";


const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

    const { updateUser } = useUserGlobalStore()
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<Omit<IUser, "name">>({
      defaultValues: {
        email: "",
        password: "",
      },
    })
  
    const onSubmit = async (data: Omit<IUser, "name">) => {
      try {
        const { email, password } = data
        const _user = await loginUser({
          email: email,
          password: password,
        })
        updateUser({
          email: _user.email,
          name: _user.name,
        })
        showMessage({
          message: "Logged in successfully",
          type: "success",
        });
      } catch (error) {}
    }


  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center" >
        <Text variant="text2Xl" fontWeight="700" padding="6" color="fuchsia900">
          Hello Again!
        </Text>
        <Box mb="6" />
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
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mt="5.5" />
        <Pressable onPress={navigateToSignUpScreen}>
          <Text>Register</Text>
        </Pressable>
        <Box mb="5.5" />

        <Button label="Login" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
