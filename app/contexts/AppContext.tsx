import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
type AppContextValue = {
  dirUri: string;
  setDirUri: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [dirUri, setDirUri] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const storedDir = await AsyncStorage.getItem("dirUri");
        if (storedDir !== null) setDirUri(storedDir);
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          setTheme("dark");
        }
      } catch (e) {
        console.log("Failed to load async storage", e);
      }
    };

    load();
  }, []);

  return (
    <AppContext.Provider value={{ dirUri, setDirUri, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;