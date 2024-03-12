import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth-stack-navigation";
import AppStackNavigator from "./app-stack-navigator";
import useUserGlobalStore from "../store/useUserGlobalStore";

const Navigation = () => {
  const {user, updateUser} = useUserGlobalStore()

  return (
    <NavigationContainer>
      {user ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
