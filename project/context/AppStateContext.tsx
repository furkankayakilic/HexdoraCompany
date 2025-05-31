import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AvatarType = {
  selectedAvatar: number;
};

type CompletedTasksType = {
  [destinationId: string]: string[];
};

interface AppStateContextType {
  isFirstTime: boolean;
  avatar: AvatarType;
  equipment: string[];
  vehicle: number;
  completedTasks: CompletedTasksType;
  setFirstTime: (value: boolean) => void;
  setAvatar: (avatar: AvatarType) => void;
  setEquipment: (equipment: string[]) => void;
  setVehicle: (vehicle: number) => void;
  completeTask: (destinationId: string, taskId: string) => void;
  resetAppState: () => void;
  updateProgress: (category: string, taskId: string) => void;
  calculateTotalProgress: () => number;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [avatar, setAvatar] = useState<AvatarType>({
    selectedAvatar: 0,
  });
  const [equipment, setEquipment] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<CompletedTasksType>({});

  // Load state from AsyncStorage on startup
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedFirstTime = await AsyncStorage.getItem('@isFirstTime');
        if (storedFirstTime !== null) {
          setIsFirstTime(JSON.parse(storedFirstTime));
        }

        const storedAvatar = await AsyncStorage.getItem('@avatar');
        if (storedAvatar !== null) {
          setAvatar(JSON.parse(storedAvatar));
        }

        const storedEquipment = await AsyncStorage.getItem('@equipment');
        if (storedEquipment !== null) {
          setEquipment(JSON.parse(storedEquipment));
        }

        const storedVehicle = await AsyncStorage.getItem('@vehicle');
        if (storedVehicle !== null) {
          setVehicle(JSON.parse(storedVehicle));
        }

        const storedCompletedTasks = await AsyncStorage.getItem('@completedTasks');
        if (storedCompletedTasks !== null) {
          setCompletedTasks(JSON.parse(storedCompletedTasks));
        }
      } catch (error) {
        console.error('Failed to load app state:', error);
      }
    };

    loadState();
  }, []);

  // Save state changes to AsyncStorage
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('@isFirstTime', JSON.stringify(isFirstTime));
        await AsyncStorage.setItem('@avatar', JSON.stringify(avatar));
        await AsyncStorage.setItem('@equipment', JSON.stringify(equipment));
        await AsyncStorage.setItem('@vehicle', JSON.stringify(vehicle));
        await AsyncStorage.setItem('@completedTasks', JSON.stringify(completedTasks));
      } catch (error) {
        console.error('Failed to save app state:', error);
      }
    };

    saveState();
  }, [isFirstTime, avatar, equipment, vehicle, completedTasks]);

  const handleSetFirstTime = (value: boolean) => {
    setIsFirstTime(value);
  };

  const handleSetAvatar = (newAvatar: AvatarType) => {
    setAvatar(newAvatar);
  };

  const handleSetEquipment = (newEquipment: string[]) => {
    setEquipment(newEquipment);
  };

  const handleSetVehicle = (newVehicle: number) => {
    setVehicle(newVehicle);
  };

  const completeTask = (destinationId: string, taskId: string) => {
    setCompletedTasks((prevTasks) => {
      const destTasks = prevTasks[destinationId] || [];
      
      // Only add the task if it's not already completed
      if (!destTasks.includes(taskId)) {
        return {
          ...prevTasks,
          [destinationId]: [...destTasks, taskId],
        };
      }
      
      return prevTasks;
    });
  };

  const resetAppState = () => {
    setIsFirstTime(true);
    setAvatar({
      selectedAvatar: 0,
    });
    setEquipment([]);
    setVehicle(0);
    setCompletedTasks({});
  };

  const updateProgress = (category: string, taskId: string) => {
    setCompletedTasks(prev => {
      const categoryTasks = prev[category] || [];
      if (!categoryTasks.includes(taskId)) {
        return {
          ...prev,
          [category]: [...categoryTasks, taskId]
        };
      }
      return prev;
    });
  };

  const calculateTotalProgress = () => {
    const totalTasks = Object.values(completedTasks).reduce(
      (sum, tasks) => sum + tasks.length, 0
    );
    return Math.round((totalTasks / 25) * 100);
  };

  return (
    <AppStateContext.Provider
      value={{
        isFirstTime,
        avatar,
        equipment,
        vehicle,
        completedTasks,
        setFirstTime: handleSetFirstTime,
        setAvatar: handleSetAvatar,
        setEquipment: handleSetEquipment,
        setVehicle: handleSetVehicle,
        completeTask,
        resetAppState,
        updateProgress,
        calculateTotalProgress,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};