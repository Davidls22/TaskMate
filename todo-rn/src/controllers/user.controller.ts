import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

// Function to generate a token for a user
const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

// Controller function to create a new user
export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });

    // Check if the user already exists
    if (existingUser) {
      return response.status(409).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Use 'password' instead of 'hashedPassword'
    });
    

    // Return success message
    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in createUser", error);
    throw error;
  }
};

// Controller function to log in a user
export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;

    // Find the user by email
    const existingUser = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!existingUser) {
      return response.status(409).send({ message: "User doesnt exist" });
    }

    // Compare the provided password with the hashed password
    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If the passwords match, generate a token and return it with user details
    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      // If the passwords don't match, return an error
      return response.status(400).send({ message: "wrong credentials" });
    }
  } catch (error) {
    console.log("error in loginUser", error);
    throw error;
  }
};
