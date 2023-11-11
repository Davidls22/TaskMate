import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-models";
import { ITask } from "../types";

export const getAllTasks = async (
    request: AuthRequest, 
    response: Response
) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasks", error);
    response.send({ error: "error fetching tasks" });
    throw error;
  }
};

export const getAllTasksByCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const { id } = request.params
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    response.send({ error: "error fetching tasks" });
    throw error;
  }
};

export const getAllCompletedTasks = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const userId = request.user;
      const tasks = await Task.find({
        user: userId,
        isCompleted: true
      });
      response.send(tasks);
    } catch (error) {
      console.log("error in getAllCompletedTasks", error);
      response.send({ error: "error fetching tasks" });
      throw error;
    }
  };

  export const getAllTasksForToday = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const userId = request.user;
      const todayISODate = new Date()
      todayISODate.setHours(0,0,0,0)
      const tasks = await Task.find({
        user: userId,
        date: todayISODate.toISOString(),
      });
      response.send(tasks);
    } catch (error) {
      console.log("error in getAllTasksForToday", error);
      response.send({ error: "error fetching tasks" });
      throw error;
    }
  };

export const createTask = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user;
    const { name, date, categoryId }: ITask = request.body;

    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });
    response.send(task);
  } catch (error) {
    console.log("error in createTasks", error);
    response.send({ error: "error creating tasks" });
    throw error;
  }
};

export const toggleTaskStatus = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { isCompleted } = request.body;
    const { id } = request.params;

    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );
    response.send(task);
  } catch (error) {
    console.log("error in toggleTaskStatus", error);
    response.send({ error: "error while toggling status" });
    throw error;
  }
};

export const deleteTask = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { id } = request.params;
      await Task.deleteOne({ _id: id });
      response.send({ message: "Task deleted" });
    } catch (error) {
      console.log("error in deleteTask", error);
      response.send({ message: "something went wrong" });
      throw error;
    }
  };

  export const editTask = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { _id, categoryId,date,name }: ITask = request.body;
      await Task.updateOne(
        {
          _id,
        },
        {
          $set: {
            name,
            categoryId,
            date,
          },
        }
      );
      response.send({ message: "Task updated" });
    } catch (error) {
      console.log("error in editTask", error);
      response.send({ message: "something went wrong" });
      throw error;
    }
  };