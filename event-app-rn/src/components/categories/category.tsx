import { ICategory } from "../../types";
import React from "react";
import { Box, Text } from "../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { CategoriesNavigationType } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";

type CategoryProps = {
  category: ICategory;
};

const Category = ({ category }: CategoryProps) => {
  const navigate = useNavigation<CategoriesNavigationType>();
  const navigateToCreateCategory = () => {
    navigate.navigate("CreateCategory", {
      category: category,
    })
  }

  const navigateToCategoryScreen = () => {
    navigate.navigate("Category", {
      id: category._id,
    })
  }

  return (
    <Pressable onPress={navigateToCategoryScreen}>
    <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flexDirection="row">
          <Text variant="textBase" fontWeight="600" mr="3">
            {category.icon.symbol}
          </Text>
          <Text variant="textBase" fontWeight="600">
            {category.name}
          </Text>
        </Box>
        <Pressable onPress={navigateToCreateCategory}>
          <Entypo name="dots-three-vertical" size={16} />
        </Pressable>
      </Box>
    </Box>
    </Pressable>
  );
};

export default Category;
