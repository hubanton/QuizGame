import { createContext, useState } from "react";

export const GameContext = createContext()

export default function GameContextProvider(props) {

    const [settings, setSettings] = useState({
        amount: 4,
        category: 9,
        difficulty: "",
        category_name: "General Knowledge"
    })
    return <GameContext.Provider
        value={{settings, setSettings}}
    >
        {props.children}
    </GameContext.Provider>
}