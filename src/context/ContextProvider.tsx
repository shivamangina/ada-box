/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useReducer } from "react"
import { initialState } from "./initialState"
import { GlobalReducer } from "./GlobalReducer"

export const GlobalContext = React.createContext(initialState)

export const GlobalProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState)

    function setAppLoading(data: any) {
        dispatch({
            type: "SET_LOADING",
            payload: data,
        })
    }

    function setFileTree(data: any) {
        dispatch({
            type: "SET_FILETREE",
            payload: data,
        })
    }

    const value = {
        ...state,
        setAppLoading,
        setFileTree,
    }

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => useContext(GlobalContext)
