"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface ThemeProp {
    theme: "theme1" | "theme2" | "theme3",
    changeTheme: (theme: ThemeProp["theme"]) => void
}

const initialState: ThemeProp = {
    theme: "theme1",
    changeTheme: () => {}
}

const ThemeContext = createContext(initialState)

export const ThemeProvider = ({children}:{children:ReactNode}) => {
    const [theme, setTheme] = useState<ThemeProp['theme']>("theme1")

    function changeTheme(theme:ThemeProp["theme"]) {
        setTheme(theme)
    }

    useEffect(() => {
        document.querySelector("html")?.setAttribute("aria-theme", theme);
    }, [theme])

    const values = {
        theme,
        changeTheme
    }

    return <ThemeContext.Provider value={values}>{children }</ThemeContext.Provider>
} 

export const useTheme = () => useContext(ThemeContext)