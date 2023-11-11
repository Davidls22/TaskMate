import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import React from "react";
import HomeStackNavigator from "./home-stack-navigator";
import CompletedScreen from "../screens/completed-screen";
import TodayScreen from "../screens/today-screen";
import CategoriesStackNavigator from "./categories-stack-navigator";
import Icons from "../components/shared/icons";
import { useTheme } from "@shopify/restyle";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.sky500,
        tabBarInactiveTintColor: theme.colors.slate700,
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: "Home",
          tabBarIcon: ({ color }) => <Icons name="home" color={color} />, // Use Icons component to render the icon
          headerShown: false, // Hide the header for this tab screen
        })}
      />

      {/* Completed Tab */}
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: "Completed",
          tabBarIcon: ({ color }) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      />

      {/* Today Tab */}
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={() => ({
          title: "Today",
          tabBarIcon: ({ color }) => <Icons name="calendar" color={color} />,
          headerShown: false,
        })}
      />

      {/* Categories Tab */}
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: "Categories",
          tabBarIcon: ({ color }) => <Icons name="categories" color={color} />,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
