"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

const InstaDataContext = createContext()

export const InstaDataProvider = (({ children }) => {
    const [userData, setUserData] = useState({})
    const [username, setUsername] = useState('')

    return (
        <InstaDataContext.Provider value={{ userData, setUserData, username, setUsername }}>
            {children}
        </InstaDataContext.Provider>
    )
})

export const useInstaData = () => useContext(InstaDataContext)