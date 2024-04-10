import { Box, Text } from "../../utils/theme";
import React from "react";
import { ITask } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import useSWRMutation from "swr/mutation";
import axiosInstance from "../../services/config";

type TaskProps = {
  task: ITask;
};

interface ITaskStatusRequest{
    id: string
    isCompleted: boolean
}

const toggleTaskStatusRequest = async (
  url: string,
  { arg }: { arg: ITaskStatusRequest }
) => {
  try {
    await axiosInstance.put(url + "/" +arg.id, {
        ...arg,
    })
  } catch (error) {
    console.log("error in toggleTaskStatusRequest", error);
    throw error;
  }
};

const Task = ({ task }: TaskProps) => {
  const { trigger } = useSWRMutation("tasks/update", toggleTaskStatusRequest);

  const toggleTaskStatus = async () => {
    try {
        const _updatedTask = {
            id: task._id,
            isCompleted: !task.isCompleted,
        }
        await trigger(_updatedTask)
    } catch (error) {
        console.log('error in toggleTaskStatus', error)
        throw error
    }
  }



  return (
    <Pressable onPress={toggleTaskStatus}>
      <Box p="4" bg="lightGray" borderRadius="rounded-5xl" flexDirection="row">
        <Box flexDirection="row" alignItems="center">
          <Box
            height={26}
            width={26}
            bg={task.isCompleted ? "green400" : "gray300"}
            borderRadius="rounded-5xl"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="checkmark-sharp" size={20} color="white" />
          </Box>
          <Text ml="3" variant="textBase">
            {task.name}
          </Text>
        </Box>
        <Box></Box>
      </Box>
    </Pressable>
  );
};

export default Task;
