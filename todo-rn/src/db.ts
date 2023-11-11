import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connection = mongoose.connect(
      "mongodb+srv://davidsugden1:todolist@todo.uzpfvik.mongodb.net/mydatabase"
    );
    if (connection) {
      console.log("connection established");
    }
  } catch (error) {
    console.log("error connecting", error);
    throw error;
  }
};

export default connectToDatabase;
