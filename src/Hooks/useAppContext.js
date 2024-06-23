import { useContext } from "react";
import { AppContext } from "../context/appContext";

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostContextProvider');
    }
    return context;
}
