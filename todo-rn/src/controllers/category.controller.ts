import Category from "../models/category-model";
import { Response, Request } from "express";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const categories = await Category.find({
      user: user,
    });
    return response.send(categories);
  } catch (error) {
    console.log("error in getAllCategories", error);
    throw error;
  }
};

export const getCategoryById = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request
    const { id } = request.params
    const category = await Category.findOne({
      _id: id,
    })
    return response.send(category)
  } catch (error) {
    response.send({ error: "Something went wrong" })
    console.log("error in getAllCategories", error)
    throw error
  }
}

export const createCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { color, icon, isEditable, name }: ICategory = request.body;
    const { user } = request;

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    response.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    await Category.deleteMany({ _id: id });
    response.send({ message: "category deleted" });
  } catch (error) {
    console.log("error in deleteCategory", error);
    response.send({ message: "something went wrong" });
    throw error;
  }
};

export const updateCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    // Destructure properties from request body with specified interface
    const { _id, color, icon, isEditable, name }: ICategory = request.body;

    // Update the category in the database based on the provided _id
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );

    // Send a success message as the response
    response.send({ message: "category updated successfully" });
  } catch (error) {
    // Log and handle any errors that occur during the update process
    console.log("error in updateCategory", error);
    response.send({ error: "error updating" });
    throw error;
  }
};
