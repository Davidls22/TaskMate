import Loader from "../../components/shared/loader"
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper"
import Task from "../../components/tasks/task"
import TaskActions from "../../components/tasks/task-actions"
import { fetcher } from "../../services/config"
import useUserGlobalStore from "../../store/useUserGlobalStore"
import { ICategory, ITask } from "../../types"
import { getGreeting } from "../../utils/theme/helpers"
import { AnimatedText, Box, Text } from "../../utils/theme"
import { format } from "date-fns"
import React from "react"
import { FlatList } from "react-native"
import { ZoomInEasyDown } from "react-native-reanimated"
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"

import useSWR from "swr"

const today = new Date()

const greeting = getGreeting({ hour: new Date().getHours() })

const HomeScreen = () => {
  const { user } = useUserGlobalStore()

  const { logout } = useUserGlobalStore();

  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>("tasks/", fetcher)

  if (isLoading || !tasks) {
    return <Loader />
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <AnimatedText
          variant="textXl"
          fontWeight="500"
          entering={ZoomInEasyDown.delay(500).duration(700)}
        >
          Good {greeting} {user?.name}
        </AnimatedText>
        <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
          </Box>
        <Text variant="textXl" fontWeight="500">
          It’s {format(today, "eeee, LLL dd")} - {tasks.length} tasks
        </Text>
        <Box height={26} />
        <TaskActions categoryId="" />
        <Box height={26} />
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  )
}

export default HomeScreen