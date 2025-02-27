"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

const InstaDataContext = createContext()

export const InstaDataProvider = (({ children }) => {
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    return (
        <InstaDataContext.Provider value={{
            userData,
            setUserData,
            username,
            setUsername,
            isPaid,
            setIsPaid,
            isUnlocked,
            setIsUnlocked
        }}>
            {children}
        </InstaDataContext.Provider>
    )
})

export const useInstaData = () => useContext(InstaDataContext)