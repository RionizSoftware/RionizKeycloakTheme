import { createContext, useContext } from "react";

export type ThemeMode = "dark" | "light";

export interface ThemeModeValue {
    mode: ThemeMode;
    toggle: () => void;
}

export const ThemeModeContext = createContext<ThemeModeValue>({
    mode: "dark",
    toggle: () => {}
});

export function useThemeMode(): ThemeModeValue {
    return useContext(ThemeModeContext);
}
