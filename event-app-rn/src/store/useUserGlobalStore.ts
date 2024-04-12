import { create } from "zustand"
import { IAuthenticatedUser } from "../types/index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createJSONStorage, persist } from "zustand/middleware"

interface IUserGlobalStore {
    user: IAuthenticatedUser | null
    updateUser: (user: IAuthenticatedUser | null) => void
    logout: () => void; 
  }

  const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
      (set, get) => ({
        user: null,
        updateUser: (user) => {
          set({
            user,
          })
        },
        logout: () => {
          // Clear user data (including token) upon logout
          AsyncStorage.removeItem("token");
          set({ user: null });
        },
      }),
      {
        name: "event-app-user-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
  
  export default useUserGlobalStore