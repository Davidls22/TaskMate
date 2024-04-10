import React, { useState } from "react";
import { Box, Text, Theme } from "../../utils/theme";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import NavigateBack from "../../components/shared/navigate-back";
import { Pressable, TextInput } from "react-native";
import axiosInstance, { BASE_URL } from "../../services/config";
import { useTheme } from "@shopify/restyle";
import { ICategory, ICategoryRequest, IColor, IIcon } from "@/types";
import { getColors, getIcons } from "../../utils/theme/helpers";
import Button from "../../components/shared/button";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useSWRConfig } from "swr";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CategoriesStackParamList } from "@/navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = getColors();
const ICONS = getIcons();

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_ICON = ICONS[0];

const createCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  await axiosInstance.post(url, {
    ...arg,
  });
  try {
  } catch (error) {}
};

const updateCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  await axiosInstance.put(url, {
    ...arg,
  });
  try {
  } catch (error) {}
};

const deleteCategoryRequest = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  try {
    await axiosInstance.delete(url + "/" + arg.id);
  } catch (error) {
    console.log("error in deleteCategoryRequest", error);
    throw error;
  }
};

type createCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategoryScreen = () => {
  const theme = useTheme<Theme>();
  const navigate = useNavigation();

  const route = useRoute<createCategoryRouteTypes>();

  const isEditing = route.params.category ? true : false;

  const { trigger, isMutating } = useSWRMutation(
    "categories/create",
    createCategoryRequest
  );

  const { trigger: updateTrigger } = useSWRMutation(
    "categories/update",
    updateCategoryRequest
  );

  const { trigger: deleteTrigger } = useSWRMutation(
    "categories/",
    deleteCategoryRequest
  );

  const { mutate } = useSWRConfig();

  const [newCategory, setNewCategory] = useState<
    Omit<ICategory, "_id" | "user" | "isEditable">
  >({
    name: route.params.category?.name ?? "",
    color: route.params.category?.color ?? DEFAULT_COLOR,
    icon: route.params.category?.icon ?? DEFAULT_ICON,
  });

  const createNewCategory = async () => {
    try {
      if (isEditing) {
        const updatedCategoryItem = {
          ...route.params.category,
          ...newCategory,
        };
        await updateTrigger({
          ...updatedCategoryItem,
        });
      } else {
        await trigger({
          ...newCategory,
        });
      }
      await mutate(BASE_URL + "categories");
      navigate.goBack();
    } catch (error) {
      console.log("error in createNewCategory", error);
      throw error;
    }
  };

  const updateColor = (color: IColor) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        color,
      };
    });
  };

  const updateIcon = (icon: IIcon) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        icon,
      };
    });
  };

  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?._id)
        await deleteTrigger({
          id: route.params.category?._id,
        })
        await mutate(BASE_URL + "categories");
        navigate.goBack();
    } catch (error) {
      console.log("error in deleteCategory", error);
      throw error;
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <NavigateBack />
          {isEditing && (
            <Pressable onPress={deleteCategory}>
              <MaterialCommunityIcons
                name="delete"
                color={theme.colors.rose600}
                size={24}
              />
            </Pressable>
          )}
        </Box>
        <Box height={16} />
        <Box bg="gray250" borderRadius="rounded-2xl">
          <TextInput
            style={{
              fontSize: 20,
              lineHeight: 26,
              padding: 15,
            }}
            value={newCategory.name}
            maxLength={36}
            placeholder="Create new list"
            placeholderTextColor={theme.colors.gray5}
            onChangeText={(text) => {
              setNewCategory((prev) => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
          />
        </Box>
        <Box height={24} />
        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="violet100"
            width={80}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center"
          >
            <Text
              variant="textBase"
              fontWeight="600"
              color={newCategory.color.name as any}
            >
              Colours
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {COLORS.map((_color) => {
              return (
                <Pressable
                  key={_color.id}
                  onPress={() => {
                    updateColor(_color);
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: _color.code,
                    }}
                    width={24}
                    height={24}
                    borderRadius="rounded-2xl"
                  ></Box>
                </Pressable>
              );
            })}
          </Box>
        </Box>
        <Box height={24} />
        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="violet100"
            width={80}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center"
          >
            <Text
              variant="textBase"
              fontWeight="600"
              fontSize={23}
              color={newCategory.color.name as any}
            >
              {newCategory.icon.symbol}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map((icon) => {
              return (
                <Pressable
                  key={icon.id}
                  onPress={() => {
                    updateIcon(icon);
                  }}
                >
                  <Box width={24} height={24} borderRadius="rounded-2xl">
                    <Text fontSize={17}>{icon.symbol}</Text>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
        </Box>
        <Box position="absolute" bottom={4} left={0} right={0}>
          <Button
            label={isEditing ? "Edit Category" : "Create new Category"}
            onPress={createNewCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategoryScreen;
